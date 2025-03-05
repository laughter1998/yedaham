//{
/**
 * @fileOverview This file contains Husky plugin that takes care of the operations related to wrapping the sentence around with a <P> tag when enter key is pressed
 * @name hp_SE_WYSIWYGEnterKey.js
 */
nhn.husky.SE_WYSIWYGEnterKey = $Class({
	name : "SE_WYSIWYGEnterKey",
	// IE/Opera do not need this
	unsupportedBrowser : ['ie', 'opera'],
	oEditingArea : null,

	$init : function(oEditingArea){
		this.oEditingArea = oEditingArea;
	},

	$BEFORE_MSG_APP_READY : function(){
		// the right document will be available only when the src is completely loaded
		if(this.oEditingArea && this.oEditingArea.tagName == "IFRAME")
			this.oEditingArea = this.oEditingArea.contentWindow.document;
	},

	$ON_EVENT_EDITING_AREA_KEYDOWN : function(oEvent){
		if(this.oApp.getEditingMode() != "WYSIWYG") return;

		var oKeyInfo = oEvent.key();
		
		if(oKeyInfo.shift) return;
		
		if(oKeyInfo.enter){
			var oSelection = this.oApp.getSelection();
			var sBM = oSelection.placeStringBookmark();
			var oLineInfo = oSelection.getLineInfo();
			var oStart = oLineInfo.oStart;
			var oEnd = oLineInfo.oEnd;

			//top.document.title = oStart.oNode.tagName+":"+oStart.oNode.nodeValue+", "+oEnd.oNode.tagName+":"+oEnd.oNode.nodeValue+"::"+oStart.bParentBreak+", "+oStart.oLineBreaker.tagName;

			// line broke by sibling
			// or
			// the parent line breaker is just a block container
			if(!oStart.bParentBreak || oSelection.rxBlockContainer.test(oStart.oLineBreaker.tagName)){
				oEvent.stop();

				var oSWrapper = this.oEditingArea.createElement("P");
				oSelection.moveToBookmark(sBM);
				oSelection.setStartBefore(oStart.oNode);
				oSelection.surroundContents(oSWrapper);

				oSelection.collapseToEnd();

				var oEWrapper = this.oEditingArea.createElement("P");
				oSelection.setEndAfter(oEnd.oNode);
				oSelection.surroundContents(oEWrapper);

				oSelection.removeStringBookmark(sBM);

				if(oSWrapper.innerHTML == "") oSWrapper.innerHTML = "<br>";
				if(oEWrapper.innerHTML == "") oEWrapper.innerHTML = "<br>";
				
				if(oEWrapper.nextSibling && oEWrapper.nextSibling.tagName == "BR") oEWrapper.parentNode.removeChild(oEWrapper.nextSibling);

				oSelection.selectNodeContents(oEWrapper);
				oSelection.collapseToStart();
				oSelection.select();
				this.oApp.exec("CHECK_STYLE_CHANGE", []);
			}else{
				oSelection.removeStringBookmark(sBM);
			}
		}
	}
});
//}
