//{
/**
 * @fileOverview This file contains Husky plugin that takes care of the operations related to Undo/Redo
 * @name hp_SE_UndoRedo.js
 * @required SE_EditingAreaManager, HuskyRangeManager
 */
nhn.husky.SE_UndoRedo = $Class({
	name : "SE_UndoRedo",
	actionHistory : null,
	// this may also be called, lastAdded/lastRestored
	oCurStateIdx : null,
	iMinimumSizeChange : 10,
	sBlankContentsForFF : "<br>",

	$init : function(){
		this.aUndoHistory = [];
		this.oCurStateIdx = {nIdx: 0, nStep: 0};
	},

	$PRECONDITION : function(sCmd){
		if(sCmd.match(/_DO_RECORD_UNDO_HISTORY_AT$/)) return true;

		try{
			if(this.oApp.getEditingMode() != "WYSIWYG") return false;
		}catch(e){
			return false;
		}
		
		return true;
	},
	
	$BEFORE_MSG_APP_READY : function(){
		this.oApp.exec("DO_RECORD_UNDO_HISTORY_AT", [this.oCurStateIdx, "", "", null]);
	},

	$ON_MSG_APP_READY : function(){
		this.bFF = $Agent().navigator().firefox;

		this.oApp.exec("ADD_APP_PROPERTY", ["getUndoHistory", $Fn(this.getUndoHistory, this).bind()]);
		this.oApp.exec("ADD_APP_PROPERTY", ["getUndoStateIdx", $Fn(this.getUndoStateIdx, this).bind()]);

		this.oApp.exec("REGISTER_UI_EVENT", ["undo", "click", "UNDO"]);
		this.oApp.exec("REGISTER_UI_EVENT", ["redo", "click", "REDO"]);
		
		this.oApp.exec("REGISTER_HOTKEY", ["ctrl+z", "UNDO"]);
		this.oApp.exec("REGISTER_HOTKEY", ["ctrl+y", "REDO"]);
	},
	
	$ON_UNDO : function(){
		var oTmpStateIdx = {};
		this.oApp.exec("DO_RECORD_UNDO_HISTORY", ["KEYPRESS", false, false, 1]);
		if(this.oCurStateIdx.nIdx == 0) return;

		if(this.oCurStateIdx.nStep > 0){
			this.oCurStateIdx.nStep--;
		}else{
			var oTmpHistory = this.aUndoHistory[this.oCurStateIdx.nIdx];

			this.oCurStateIdx.nIdx--;

			if(oTmpHistory.nTotalSteps>1){
				this.oCurStateIdx.nStep = 0;
			}else{
				oTmpHistory = this.aUndoHistory[this.oCurStateIdx.nIdx];
				this.oCurStateIdx.nStep = oTmpHistory.nTotalSteps-1;
			}
		}

		this.oApp.exec("RESTORE_UNDO_HISTORY", [this.oCurStateIdx.nIdx, this.oCurStateIdx.nStep]);

		this.oApp.exec("CHECK_STYLE_CHANGE", []);
	},


	$ON_REDO : function(){
		if(this.oCurStateIdx.nIdx >= this.aUndoHistory.length) return;

		var oCurHistory = this.aUndoHistory[this.oCurStateIdx.nIdx];
		if(this.oCurStateIdx.nIdx == this.aUndoHistory.length-1 && this.oCurStateIdx.nStep >= oCurHistory.nTotalSteps-1) return;
		
		if(this.oCurStateIdx.nStep < oCurHistory.nTotalSteps-1){
			this.oCurStateIdx.nStep++;
		}else{
			this.oCurStateIdx.nIdx++;
			oCurHistory = this.aUndoHistory[this.oCurStateIdx.nIdx];
			this.oCurStateIdx.nStep = oCurHistory.nTotalSteps-1;
		}

		this.oApp.exec("RESTORE_UNDO_HISTORY", [this.oCurStateIdx.nIdx, this.oCurStateIdx.nStep]);

		this.oApp.exec("CHECK_STYLE_CHANGE", []);
	},

	$ON_RECORD_UNDO_ACTION : function(sAction){
		this.oApp.exec("DO_RECORD_UNDO_HISTORY", [sAction]);
	},

	$ON_RECORD_UNDO_BEFORE_ACTION : function(sAction){
		this.oApp.exec("DO_RECORD_UNDO_HISTORY", [sAction, true, true]);
	},

	$ON_RECORD_UNDO_AFTER_ACTION : function(sAction){
		this.oApp.exec("DO_RECORD_UNDO_HISTORY", [sAction, true, false]);
	},

	$ON_RESTORE_UNDO_HISTORY : function(nUndoIdx, nUndoStateStep){
		this.oCurStateIdx.nIdx = nUndoIdx;
		this.oCurStateIdx.nStep = nUndoStateStep;

		var oCurHistory = this.aUndoHistory[this.oCurStateIdx.nIdx];
		var sContent = oCurHistory.sContent[this.oCurStateIdx.nStep];
		var oBookmark = oCurHistory.oBookmark[this.oCurStateIdx.nStep];

		this.oApp.setIR(sContent, true);

		// setting the innerHTML may change the internal DOM structure, so save the value again.
		var sCurContent = this.oApp.getIR();
		if(this.bFF && sCurContent == this.sBlankContentsForFF){
			sCurContent = "";
		}
		oCurHistory.sContent[this.oCurStateIdx.nStep] = sCurContent;
		
		var oSelection = this.oApp.getEmptySelection();
		if(oSelection.selectionLoaded){
			if(oBookmark){
				oSelection.moveToXPathBookmark(oBookmark);
			}else{
				oSelection = this.oApp.getEmptySelection();
			}
			
			oSelection.select();
		}
	},

	$ON_DO_RECORD_UNDO_HISTORY : function(sAction, bTwoStepAction, bBeforeAction, nForceAddUnlessEqual){
		bTwoStepAction = bTwoStepAction || false;
		bBeforeAction = bBeforeAction || false;
		nForceAddUnlessEqual = nForceAddUnlessEqual || 0;
		
		// if we're in the middle of some action history, remove everything after current idx if any "little" change is made
		if(!(this.oCurStateIdx.nIdx == this.aUndoHistory.length-1)) nForceAddUnlessEqual = 1;

		var oCurHistory = this.aUndoHistory[this.oCurStateIdx.nIdx];

		var sCurContent = this.oApp.getIR();
		var sHistoryContent = oCurHistory.sContent[this.oCurStateIdx.nStep];

		if(this.bFF && sCurContent == this.sBlankContentsForFF){
			sCurContent = "";
		}

		// every TwoStepAction needs to be recorded
		if(!bTwoStepAction){
			switch(nForceAddUnlessEqual){
				case 0:
					if(Math.abs(sHistoryContent.length - sCurContent.length)<this.iMinimumSizeChange) return;
					break;
				
				case 1:
					if(sHistoryContent == sCurContent) return;
					break;
				
				// write at all times
				case 2:
					break;
			}
		}

		var oSelection = this.oApp.getSelection();
		
		var oBookmark=null;
		if(oSelection.selectionLoaded){
			oBookmark = oSelection.getXPathBookmark();
		}
		
		var oInsertionIdx = {nIdx:this.oCurStateIdx.nIdx, nStep:this.oCurStateIdx.nStep};
		if(bTwoStepAction){
			if(bBeforeAction){
				oInsertionIdx.nStep = 0;
			}else{
				oInsertionIdx.nStep = 1;
			}
		}else{
			oInsertionIdx.nStep = 0;
		}

		if(oInsertionIdx.nStep == 0 && this.oCurStateIdx.nStep == oCurHistory.nTotalSteps-1){
			oInsertionIdx.nIdx = this.oCurStateIdx.nIdx+1;
		}

		this.oApp.exec("DO_RECORD_UNDO_HISTORY_AT", [oInsertionIdx, sAction, sCurContent, oBookmark]);
	},

	$ON_DO_RECORD_UNDO_HISTORY_AT : function(oInsertionIdx, sAction, sContent, oBookmark){
		if(oInsertionIdx.nStep != 0){
			this.aUndoHistory[oInsertionIdx.nIdx].nTotalSteps = oInsertionIdx.nStep+1;
			this.aUndoHistory[oInsertionIdx.nIdx].sContent[oInsertionIdx.nStep] = sContent;
			this.aUndoHistory[oInsertionIdx.nIdx].oBookmark[oInsertionIdx.nStep] = oBookmark;
		}else{
			var oNewHistory = {sAction:sAction, nTotalSteps: 1};
			oNewHistory.sContent = [];
			oNewHistory.sContent[0] = sContent;

			oNewHistory.oBookmark = [];
			oNewHistory.oBookmark[0] = oBookmark;
			this.aUndoHistory.splice(oInsertionIdx.nIdx, this.aUndoHistory.length - oInsertionIdx.nIdx, oNewHistory);
		}

		this.oCurStateIdx.nIdx = oInsertionIdx.nIdx;
		this.oCurStateIdx.nStep = oInsertionIdx.nStep;
	},

	_getUndoHistory : function(){
		return this.aUndoHistory;
	},

	_getUndoStateIdx : function(){
		return this.oCurStateIdx;
	}
});
//}