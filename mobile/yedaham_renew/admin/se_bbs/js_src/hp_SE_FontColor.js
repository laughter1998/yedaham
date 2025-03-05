//{
/**
 * @fileOverview This file contains Husky plugin that takes care of the operations related to changing the font color
 * @name hp_SE_FontColor.js
 */
nhn.husky.SE_FontColor = $Class({
	name : "SE_FontColor",
	rxColorPattern : /^#?[0-9a-fA-F]{6}$|^rgb\(\d+, ?\d+, ?\d+\)$/i,

	$init : function(elAppContainer){
		this._assignHTMLObjects(elAppContainer);
	},
	
	_assignHTMLObjects : function(elAppContainer){
		this.elDropdownLayer = cssquery.getSingle("DIV.husky_seditor_fontcolor_layer", elAppContainer);
	},

	$ON_MSG_APP_READY : function(){
		this.oApp.exec("REGISTER_UI_EVENT", ["fontColor", "click", "TOGGLE_FONTCOLOR_LAYER"]);
	},
	
	$ON_TOGGLE_FONTCOLOR_LAYER : function(){
		this.oApp.exec("TOGGLE_TOOLBAR_ACTIVE_LAYER", [this.elDropdownLayer, null, "SHOW_COLOR_PALETTE", ["APPLY_FONTCOLOR", this.elDropdownLayer]]);
	},
	
	$ON_APPLY_FONTCOLOR : function(sFontColor){
		if(!this.rxColorPattern.test(sFontColor)){
			alert(this.oApp.$MSG("SE_FontColor.invalidColorCode"));
			return;
		}
		
		this.oApp.exec("SET_WYSIWYG_STYLE", [{"color":sFontColor}]);
		
		this.oApp.exec("HIDE_ACTIVE_LAYER");
	}
});
//}