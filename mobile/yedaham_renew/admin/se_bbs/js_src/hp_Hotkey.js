//{
/**
 * @fileOverview This file contains Husky plugin that takes care of the hotkey feature
 * @name hp_Hotkey.js
 */
nhn.husky.Hotkey = $Class({
	name : "Hotkey",

	$init : function(){
		this.oShortcut = shortcut;
	},

	$ON_REGISTER_HOTKEY : function(sHotkey, sCMD, sArgs){
		if(!sArgs) sArgs = [];
		var func = $Fn(this.oApp.exec, this.oApp).bind(sCMD, sArgs);

		this.oShortcut(sHotkey, this.oApp.getWYSIWYGDocument()).addEvent(func);
	}
});
//}