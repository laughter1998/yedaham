//{
/**
 * @fileOverview This file contains Husky plugin that takes care of the operations related to changing the editing mode using a Button element
 * @name hp_SE_EditingModeToggler.js
 */
nhn.husky.SE_EditingModeToggler = $Class({
	name : "SE_EditingModeToggler",
	
	$init : function(elAppContainer){
		this._assignHTMLObjects(elAppContainer);
	},

	_assignHTMLObjects : function(elAppContainer){
		elAppContainer = $(elAppContainer) || document;

		this.elModeToggleButton = cssquery.getSingle("BUTTON.husky_seditor_mode_toggle_button", elAppContainer);
		this.welModeToggleButton = $Element(this.elModeToggleButton);
	},
	
	$ON_MSG_APP_READY : function(){
		this.oApp.registerBrowserEvent(this.elModeToggleButton, "click", "EVENT_TOGGLE_EDITING_MODE", []);
	},
	
	$ON_EVENT_TOGGLE_EDITING_MODE : function(){
		if(this.oApp.getEditingMode() == "WYSIWYG")
			this.oApp.exec("CHANGE_EDITING_MODE", ["HTMLSrc"]);
		else
			this.oApp.exec("CHANGE_EDITING_MODE", ["WYSIWYG"]);
	},
	
	$ON_CHANGE_EDITING_MODE : function(sMode){
		if(sMode == "HTMLSrc"){
			this.welModeToggleButton.addClass("active");
			this.oApp.exec("DISABLE_ALL_UI", []);
		}else{
			this.welModeToggleButton.removeClass("active");
			this.oApp.exec("ENABLE_ALL_UI", []);
		}
	}
});
//}