if(typeof window.nhn=='undefined') window.nhn = {};
if (!nhn.husky) nhn.husky = {};

 //{
 /**
 * @fileOverview This file contains Husky framework core
 * @name HuskyCore.js
 */
nhn.husky.HuskyCore = $Class({
	name : "HuskyCore",

	$init : function(htOptions){
		htOptions = !htOptions?{}:$Class({}).extend({
			oDebugger : null
		}).extend(htOptions);
		if(htOptions.oDebugger){
			this.oDebugger = htOptions.oDebugger;
			this.oDebugger.oApp = this;
		}

		// To prevent processing a Husky command before all the plugins are registered and ready,
		// Queue up all the commands here until the application's status is changed to READY
		this.commandQueue = [];

		this.oCommandMap = {};
		this.oDisabledCommand = {};
		this.aPlugins = [];

		this.appStatus = nhn.husky.APP_STATUS["NOT_READY"];
		
		// Register the core as a plugin so it can receive messages
		this.registerPlugin(this);
	},

	exec : function(msg, args, oEvent){
		// If the application is not yet ready just queue the command
		if(this.appStatus == nhn.husky.APP_STATUS["NOT_READY"]){
			this.commandQueue[this.commandQueue.length] = {'msg':msg, 'args':args, 'event':oEvent};
			return true;
		}

		this.exec = this._exec;
		this.exec(msg, args, oEvent);
	},

	delayedExec : function(msg, args, nDelay, oEvent){
		var fExec = $Fn(this.exec, this).bind(msg, args, oEvent);
		setTimeout(fExec, nDelay);
	},
	
	_exec : function(msg, args, oEvent){return (this._exec = this.oDebugger?this._execWithDebugger:this._execWithoutDebugger).call(this, msg, args, oEvent);},
	_execWithDebugger : function(msg, args, oEvent){this.oDebugger.log_MessageStart(msg, args);var bResult = this._doExec(msg, args, oEvent);this.oDebugger.log_MessageEnd(msg, args);return bResult;	},
	_execWithoutDebugger : function(msg, args, oEvent){return this._doExec(msg, args, oEvent);},
	_doExec : function(msg, args, oEvent){
		var bContinue = false;

		if(!this.oDisabledCommand[msg]){
			var allArgs = [];
			if(args && args.length){
				var iLen = args.length;
				for(var i=0; i<iLen; i++) allArgs[i] = args[i];
			}
			if(oEvent) allArgs[allArgs.length] = oEvent;

			var bContinue = true;
			bContinue = this._execMsgStep("BEFORE", msg, allArgs);
			if(bContinue) bContinue = this._execMsgStep("ON", msg, allArgs);
			if(bContinue) bContinue = this._execMsgStep("AFTER", msg, allArgs);
		}

		return bContinue;
	},

	registerPlugin : function(oPlugin){
		if(!oPlugin) throw("An error occured in registerPlugin(): invalid plug-in");

		oPlugin.nIdx = this.aPlugins.length;
		oPlugin.oApp = this;
		this.aPlugins[oPlugin.nIdx] = oPlugin;

		// If the plugin does not specify that it takes time to be ready, change the stauts to READY right away
		if(oPlugin.status != nhn.husky.PLUGIN_STATUS["NOT_READY"]) oPlugin.status = nhn.husky.PLUGIN_STATUS["READY"];

		this.exec("MSG_PLUGIN_REGISTERED", [oPlugin]);

		return oPlugin.nIdx;
	},

	disableCommand : function(sCommand, bDisable){this.oDisabledCommand[sCommand] = bDisable;},

	registerBrowserEvent : function(obj, sEvent, sCMD, aParams, nDelay){
		aParams = aParams || [];
		var func = (nDelay)?$Fn(this.delayedExec, this).bind(sCMD, aParams, nDelay):$Fn(this.exec, this).bind(sCMD, aParams);
		$Fn(func, this).attach(obj, sEvent);
	},

	run : function(){
		// Change the status from NOT_READY to let exec to process all the way
		this._changeAppStatus(nhn.husky.APP_STATUS["WAITING_FOR_PLUGINS_READY"]);

		// Process all the commands in the queue
		var iQueueLength = this.commandQueue.length;
		for(i=0; i<iQueueLength; i++){
			var curMsgAndArgs = this.commandQueue[i];
			this.exec(curMsgAndArgs.msg, curMsgAndArgs.args, curMsgAndArgs.event);
		}

		this._waitForPluginReady();
	},

	// Use this also to update the mapping
	createCommandMap : function(sMsgHandler){
		this.oCommandMap[sMsgHandler] = [];

		var nLen = this.aPlugins.length;
		for(var i=0; i<nLen; i++) this._doAddToCommandMap(sMsgHandler, this.aPlugins[i]);
	},
	
	addToCommandMap : function(sMsgHandler, oPlugin){
		// cannot "ADD" unless the map is already created.
		// the message will be added automatically to the mapping when it is first passed anyways, so do not add now
		if(!this.oCommandMap[sMsgHandler]) return;

		this._addToCommandMap(sMsgHandler, oPlugin);
	},

	_changeAppStatus : function(appStatus){
		this.appStatus = appStatus;

		// Initiate MSG_APP_READY if the application's status is being switched to READY
		if(this.appStatus == nhn.husky.APP_STATUS["READY"]) this.exec("MSG_APP_READY");
	},

	_execMsgStep : function(sMsgStep, sMsg, args){return (this._execMsgStep = this.oDebugger?this._execMsgStepWithDebugger:this._execMsgStepWithoutDebugger).call(this, sMsgStep, sMsg, args);},
	_execMsgStepWithDebugger : function(sMsgStep, sMsg, args){this.oDebugger.log_MessageStepStart(sMsgStep, sMsg, args);var bStatus = this._execMsgHandler ("$"+sMsgStep+"_"+sMsg, args);this.oDebugger.log_MessageStepEnd(sMsgStep, sMsg, args);return bStatus;},
	_execMsgStepWithoutDebugger : function(sMsgStep, sMsg, args){return this._execMsgHandler ("$"+sMsgStep+"_"+sMsg, args);},
	_execMsgHandler : function(sMsgHandler, args){
		if(!this.oCommandMap[sMsgHandler]){
			this.createCommandMap(sMsgHandler);
		}

		var aPlugins = this.oCommandMap[sMsgHandler];
		var iNumOfPlugins = aPlugins.length;
		
		if(iNumOfPlugins == 0) return true;

		var tmpStatus, bResult = true;
		// two similar codes were written twice due to the performace.
		if(sMsgHandler.match(/^\$(BEFORE|ON|AFTER)_MSG_APP_READY$/)){
			for(var i=0; i<iNumOfPlugins; i++){
				tmpStatus = this._execHandler(aPlugins[i], sMsgHandler, args);
				if(tmpStatus === false){
					bResult = false;
					break;
				}
			}
		}else{
			for(var i=0; i<iNumOfPlugins; i++){
				if(typeof aPlugins[i]["$PRECONDITION"] == "function") if(!this._execHandler(aPlugins[i], "$PRECONDITION", [sMsgHandler, args])) continue;

				tmpStatus = this._execHandler(aPlugins[i], sMsgHandler, args);
				if(tmpStatus === false){
					bResult = false;
					break;
				}
			}
		}
		
		return bResult;
	},
	
	_execHandler : function(oPlugin, sHandler, args){return	(this._execHandler = this.oDebugger?this._execHandlerWithDebugger:this._execHandlerWithoutDebugger).call(this, oPlugin, sHandler, args);},
	_execHandlerWithDebugger : function(oPlugin, sHandler, args){this.oDebugger.log_CallHandlerStart(oPlugin, sHandler, args);var bResult = oPlugin[sHandler].apply(oPlugin, args);this.oDebugger.log_CallHandlerEnd(oPlugin, sHandler, args);return bResult;},
	_execHandlerWithoutDebugger : function(oPlugin, sHandler, args){return oPlugin[sHandler].apply(oPlugin, args);},
	
	_doAddToCommandMap : function(sMsgHandler, oPlugin){
		if(typeof oPlugin[sMsgHandler] != "function") return;
		this.oCommandMap[sMsgHandler][this.oCommandMap[sMsgHandler].length] = oPlugin;
	},

	_waitForPluginReady : function(){
		var bAllReady = true;
		for(var i=0; i<this.aPlugins.length; i++){
			if(this.aPlugins[i].status == nhn.husky.PLUGIN_STATUS["NOT_READY"]){
				bAllReady = false;
				break;
			}
		}
		if(bAllReady){
			this._changeAppStatus(nhn.husky.APP_STATUS["READY"]);
		}else{
			setTimeout($Fn(this._waitForPluginReady, this).bind(), 100);
		}
	}
});
//}

nhn.husky.APP_STATUS = {
	'NOT_READY' : 0,
	'WAITING_FOR_PLUGINS_READY' : 1,
	'READY' : 2
};

nhn.husky.PLUGIN_STATUS = {
	'NOT_READY' : 0,
	'READY' : 1
};