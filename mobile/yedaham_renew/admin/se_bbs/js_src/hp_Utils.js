//{
/**
 * @fileOverview This file contains Husky plugin that helps various operations.
 * @name hp_Utils.js
 */
 nhn.husky.Utils = $Class({
	name : "Utils",

	$init : function(){
		var oAgentInfo = $Agent();
		var oNavigatorInfo = oAgentInfo.navigator();

		if(oNavigatorInfo.ie && oNavigatorInfo.version == 6){
			try{
				document.execCommand('BackgroundImageCache', false, true);
			}catch(e){}
		}
	},
	
	$ON_ATTACH_HOVER_EVENTS : function(aElms, sHoverClass){
		sHoverClass = sHoverClass || "hover";
		
		if(!aElms) return;
		
		var len = aElms.length;
		for(i=0; i<len; i++){
			var tmpElm = aElms[i];

			$Fn($Fn(function(tmpElm){
				$Element(tmpElm).addClass(sHoverClass);
			}, this).bind(tmpElm), this).attach(tmpElm, "mouseover");

			$Fn($Fn(function(tmpElm){
				$Element(tmpElm).removeClass(sHoverClass);
			}, this).bind(tmpElm), this).attach(tmpElm, "mouseout");
		}
	}
});
//}
