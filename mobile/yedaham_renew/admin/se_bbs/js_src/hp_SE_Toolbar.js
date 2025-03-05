//{
/**
 * @fileOverview This file contains Husky plugin that takes care of the operations related to the tool bar UI
 * @name hp_SE_Toolbar.js
 */
nhn.husky.SE_Toolbar = $Class({
	name : "SE_Toolbar",
	toolbarArea : null,
	toolbarButton : null,
	uiNameTag : "uiName",
	
	sUIClassPrefix : "husky_seditor_ui_",

	aUICmdMap : null,

	$init : function(oAppContainer){
		this.htUIList = {};

		this.aUICmdMap = {};
		this._assignHTMLObjects(oAppContainer);
	},

	_assignHTMLObjects : function(oAppContainer){
		oAppContainer = $(oAppContainer) || document;
		this.toolbarArea = cssquery.getSingle(".tool", oAppContainer);
		this.welToolbarArea = $Element(this.toolbarArea);

		this.aAllButtons = cssquery("BUTTON", this.toolbarArea);
		
		var aAllLi = this.toolbarArea.getElementsByTagName("LI");
		var nCount = aAllLi.length;
		var rxUI = new RegExp(this.sUIClassPrefix+"([^ ]+)");
		for(var i=0; i<nCount; i++){
			if(rxUI.test(aAllLi[i].className)){
				var sUIName = RegExp.$1;
				if(this.htUIList[sUIName] != null) continue;

				this.htUIList[sUIName] = cssquery.getSingle(">*:first-child", aAllLi[i]);
			}
		}
	},
	
	$ON_MSG_APP_READY : function(){
		this.oApp.registerBrowserEvent(this.toolbarArea, "mouseover", "EVENT_TOOLBAR_MOUSEOVER", []);
		this.oApp.registerBrowserEvent(this.toolbarArea, "mouseout", "EVENT_TOOLBAR_MOUSEOUT", []);

		this.oApp.exec("ADD_APP_PROPERTY", ["getToolbarButtonByUIName", $Fn(this.getToolbarButtonByUIName, this).bind()]);
	},

	$ON_EVENT_TOOLBAR_MOUSEOVER : function(weEvent){
		if(weEvent.element.tagName == "BUTTON") $Element(weEvent.element).addClass("hover");
	},

	$ON_EVENT_TOOLBAR_MOUSEOUT : function(weEvent){
		if(weEvent.element.tagName == "BUTTON") $Element(weEvent.element).removeClass("hover");
	},
	
	$ON_TOGGLE_TOOLBAR_ACTIVE_LAYER : function(oLayer, oBtn, sOpenCmd, aOpenArgs, sCloseCmd, aCloseArgs){
		this.oApp.exec("TOGGLE_ACTIVE_LAYER", [oLayer, "MSG_TOOLBAR_LAYER_SHOWN", [oLayer, oBtn, sOpenCmd, aOpenArgs], sCloseCmd, aCloseArgs]);
	},

	$ON_MSG_TOOLBAR_LAYER_SHOWN : function(oLayer, oBtn, aOpenCmd, aOpenArgs){
		this.oApp.exec("POSITION_TOOLBAR_LAYER", [oLayer, oBtn]);
		if(aOpenCmd) this.oApp.exec(aOpenCmd, aOpenArgs);
	},
	
	$ON_SHOW_TOOLBAR_ACTIVE_LAYER : function(oLayer, sCmd, aArgs, oBtn){
		this.oApp.exec("SHOW_ACTIVE_LAYER", [oLayer, sCmd, aArgs]);
		this.oApp.exec("POSITION_TOOLBAR_LAYER", [oLayer, oBtn]);
	},

	$ON_ENABLE_UI : function(sUIName){
		var elUI = this.htUIList[sUIName];
		if(!elUI) return;
		$Element(elUI).removeClass("off");
		elUI.disabled = false;

		// enable related commands
		var sCmd = "";
		if(this.aUICmdMap[sUIName]){
			for(var i=0; i<this.aUICmdMap[sUIName].length;i++){
				sCmd = this.aUICmdMap[sUIName][i];
				this.oApp.exec("ENABLE_COMMAND", [sCmd]);
			}
		}
	},

	$ON_DISABLE_UI : function(sUIName){
		var elUI = this.htUIList[sUIName];
		if(!elUI) return;
		$Element(elUI).addClass("off");
		$Element(elUI).removeClass("hover");
		elUI.disabled = true;

		// disable related commands
		var sCmd = "";
		if(this.aUICmdMap[sUIName]){
			for(var i=0; i<this.aUICmdMap[sUIName].length;i++){
				sCmd = this.aUICmdMap[sUIName][i];
				this.oApp.exec("DISABLE_COMMAND", [sCmd]);
			}
		}
	},

	$ON_SELECT_UI : function(sUIName){
		var elUI = this.htUIList[sUIName];
		if(!elUI) return;
		$Element(elUI).addClass("active");
	},

	$ON_DESELECT_UI : function(sUIName){
		var elUI = this.htUIList[sUIName];
		if(!elUI) return;
		$Element(elUI).removeClass("active");
	},

	$ON_ENABLE_ALL_UI : function(){
		var sUIName, className;

		for(var sUIName in this.htUIList){
			if(sUIName) this.oApp.exec("ENABLE_UI", [sUIName]);
		}
		$Element(this.toolbarArea).removeClass("off");
	},

	$ON_DISABLE_ALL_UI : function(){
		var sUIName;

		for(var sUIName in this.htUIList){
			if(sUIName) this.oApp.exec("DISABLE_UI", [sUIName]);
		}
		$Element(this.toolbarArea).addClass("off");
		this.oApp.exec("HIDE_ACTIVE_LAYER",[]);
	},
	
	$ON_MSG_STYLE_CHANGED : function(sAttributeName, attributeValue){
		if(attributeValue == 1)
			this.oApp.exec("SELECT_UI", [sAttributeName]);
		else
			this.oApp.exec("DESELECT_UI", [sAttributeName]);
	},
	
	$ON_REGISTER_UI_EVENT : function(sUIName, sEvent, sCmd, aParams){
		// map cmd & ui
		if(!this.aUICmdMap[sUIName]){this.aUICmdMap[sUIName] = [];}
		this.aUICmdMap[sUIName][this.aUICmdMap[sUIName].length] = sCmd;
		var elUI = this.htUIList[sUIName];
		if(!elUI) return;
		this.oApp.registerBrowserEvent(elUI, sEvent, sCmd, aParams);
	},

	$ON_POSITION_TOOLBAR_LAYER : function(oLayer, oBtn){
		oLayer = $(oLayer);
		oBtn = $(oBtn);

		if(!oLayer) return;
		if(oBtn && oBtn.tagName && oBtn.tagName == "BUTTON") oBtn.parentNode.appendChild(oLayer);
		
		oLayer.style.left = "0";
		
		var welLayer = $Element(oLayer);
		var nLayerLeft = welLayer.offset().left;
		nLayerLeft += oLayer.offsetWidth;
		
		var nToolbarLeft = this.welToolbarArea.offset().left;
		nToolbarLeft += this.toolbarArea.offsetWidth;

		if(nLayerLeft > nToolbarLeft) oLayer.style.left = (nToolbarLeft-nLayerLeft-5)+"px";
	},
	
	getToolbarButtonByUIName : function(sUIName){
		return this.htUIList[sUIName];
	}
});
//}