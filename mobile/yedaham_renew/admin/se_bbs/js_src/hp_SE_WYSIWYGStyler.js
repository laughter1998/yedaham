//{
/**
 * @fileOverview This file contains Husky plugin that takes care of the operations related to styling the font
 * @name hp_SE_WYSIWYGStyler.js
 * @required SE_EditingArea_WYSIWYG, HuskyRangeManager
 */
nhn.husky.SE_WYSIWYGStyler = $Class({
	name : "SE_WYSIWYGStyler",

	$PRECONDITION : function(sFullCommand, aArgs){
		return (this.oApp.getEditingMode() == "WYSIWYG");
	},
	
	$ON_SET_WYSIWYG_STYLE : function(oStyles){
		var oSelection = this.oApp.getSelection();
		
		// style cursor
		if(oSelection.collapsed){
			var oSpan = this.oApp.getWYSIWYGDocument().createElement("SPAN");
			oSelection.insertNode(oSpan);
			oSpan.innerHTML = unescape("%uFEFF");

			var sValue;
			for(var sName in oStyles){
				sValue = oStyles[sName];

				if(typeof sValue != "string") continue;

				oSpan.style[sName] = sValue;
			}

			oSelection.selectNodeContents(oSpan);
			oSelection.collapseToEnd();
			oSelection._window.focus();
			oSelection._window.document.body.focus();
			oSelection.select();

			// FF3 will actually display %uFEFF when it is followed by a number AND certain font-family is used(like Gulim), so remove the chcaracter for FF3
			if($Agent().navigator().firefox && $Agent().navigator().version == 3)
				oSpan.innerHTML = "";

			return;
		}

		this.oApp.exec("RECORD_UNDO_BEFORE_ACTION", ["FONT STYLE"]);

		oSelection.styleRange(oStyles);
		oSelection._window.focus();
		oSelection.select();

		this.oApp.exec("RECORD_UNDO_AFTER_ACTION", ["FONT STYLE"]);
	}
});
//}
