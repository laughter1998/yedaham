//{
/**
 * @fileOverview This file contains Husky plugin that takes care of the messages related to core operations
 * @name hp_CorePlugin.js
 */
nhn.husky.CorePlugin = $Class({
	name : "CorePlugin",

	$init : function(funcOnReady){
		this.funcOnReady = funcOnReady;
	},
	
	$AFTER_MSG_APP_READY : function(){
		this.oApp.exec("EXEC_ON_READY_FUNCTION", []);
	},

	$ON_ADD_APP_PROPERTY : function(sPropertyName, oProperty){
		this.oApp[sPropertyName] = oProperty;
	},

	$ON_REGISTER_BROWSER_EVENT : function(obj, sEvent, sCMD, aParams, nDelay){
		this.oApp.registerBrowserEvent(obj, sEvent, sCMD, aParams, nDelay);
	},
	
	$ON_DISABLE_COMMAND : function(sCommand){
		this.oApp.disableCommand(sCommand, true);
	},

	$ON_ENABLE_COMMAND : function(sCommand){
		this.oApp.disableCommand(sCommand, false);
	},

	$ON_EXEC_ON_READY_FUNCTION : function(){
		if(typeof this.funcOnReady == "function") this.funcOnReady();
	}
});
//}