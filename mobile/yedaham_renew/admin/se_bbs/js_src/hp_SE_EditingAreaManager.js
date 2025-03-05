//{
/**
 * @fileOverview This file contains Husky plugin that manages multiple number editing area plugins and the IR value
 * @name hp_SE_EditingAreaManager.js
 */
nhn.husky.SE_EditingAreaManager = $Class({
	name : "SE_EditingAreaManager",
	
	// Currently active plugin instance(SE_EditingArea_???)
	oActivePlugin : null,
	
	// Intermediate Representation of the content being edited.
	// This should be a textarea element.
	oIRField : null,
	
	bIsDirty : false,
	
	$init : function(sInitialMode, oIRField, oDimension, fOnBeforeUnload, oAppContainer){
		this.sInitialMode = sInitialMode;
		this.oIRField = $(oIRField);
		this._assignHTMLObjects(oAppContainer);
		this.fOnBeforeUnload = fOnBeforeUnload;
		
		this.oEditingMode = {};
		
		var welEditingAreaContiner = $Element(this.elEditingAreaContainer);
		
		this.elEditingAreaContainer.style.height = parseInt(oDimension.nHeight || this.elEditingAreaContainer.offsetHeight)+"px";

		this.nMinHeight = oDimension.nMinHeight || 10;
		this.niMinWidth = oDimension.nMinWidth || 10;
	},

	_assignHTMLObjects : function(oAppContainer){
		oAppContainer = $(oAppContainer) || document;
		this.elEditingAreaContainer = cssquery.getSingle("DIV.husky_seditor_editing_area_container", oAppContainer);
		this.elEditingAreaSkipUI = cssquery.getSingle("A.skip", oAppContainer);
	},

	$BEFORE_MSG_APP_READY : function(msg){
		this.oApp.exec("ADD_APP_PROPERTY", ["elEditingAreaContainer", this.elEditingAreaContainer]);
		this.oApp.exec("ADD_APP_PROPERTY", ["getIR", $Fn(this.getIR, this).bind()]);
		this.oApp.exec("ADD_APP_PROPERTY", ["setIR", this.setIR]);
		this.oApp.exec("ADD_APP_PROPERTY", ["getEditingMode", $Fn(this.getEditingMode, this).bind()]);
	},

	$ON_MSG_APP_READY : function(){
		this.oApp.exec("CHANGE_EDITING_MODE", [this.sInitialMode, true]);
		this.oApp.exec("LOAD_IR_FIELD", [false]);
		
		this.oApp.registerBrowserEvent(this.elEditingAreaSkipUI, "focus", "MSG_EDITING_AREA_SIZE_CHANGED", [], 50);
		this.oApp.registerBrowserEvent(this.elEditingAreaSkipUI, "blur", "MSG_EDITING_AREA_SIZE_CHANGED", [], 50);

		if(this.fOnBeforeUnload){
			$Fn(this.fOnBeforeUnload, this).attach(window, "beforeunload");
		}else{
			$Fn(function(){
				if(this.getIR() != this.oIRField.value || this.bIsDirty) return this.oApp.$MSG("SE_EditingAreaManager.onExit");
			}, this).attach(window, "beforeunload");
		}
	},
	
	$AFTER_MSG_APP_READY : function(){
		this.oApp.exec("UPDATE_IR_FIELD", []);
	},
	
	$ON_LOAD_IR_FIELD : function(bDontAddUndo){
		this.oApp.setIR(this.oIRField.value, bDontAddUndo);
	},
	
	$ON_UPDATE_IR_FIELD : function(){
		this.oIRField.value = this.oApp.getIR();
	},
	
	$BEFORE_CHANGE_EDITING_MODE : function(sMode){
		this._oPrevActivePlugin = this.oActivePlugin;
		this.oActivePlugin = this.oEditingMode[sMode];
	},

	$AFTER_CHANGE_EDITING_MODE : function(sMode, bNoFocus){
		if(this._oPrevActivePlugin){
			var sIR = this._oPrevActivePlugin.getIR();
			this.oApp.exec("SET_IR", [sIR]);

			this.oApp.exec("ENABLE_UI", [this._oPrevActivePlugin.sMode]);
			
			this._setEditingAreaDimension();
		}
		this.oApp.exec("DISABLE_UI", [this.oActivePlugin.sMode]);

		if(!bNoFocus){
			this.oApp.exec("FOCUS", []);
		}
	},

	$ON_SET_IS_DIRTY : function(bIsDirty){
		this.bIsDirty = bIsDirty;
	},

	$ON_FOCUS : function(){
		if(!this.oActivePlugin || typeof this.oActivePlugin.setIR != "function") return

		this.oActivePlugin.focus();
	},

	$BEFORE_SET_IR : function(sIR, bDontAddUndoHistory){
		bDontAddUndoHistory = bDontAddUndoHistory || false;
		if(!bDontAddUndoHistory) this.oApp.exec("RECORD_UNDO_ACTION", ["SET CONTENTS"]);
	},

	$ON_SET_IR : function(sIR){
		if(!this.oActivePlugin || typeof this.oActivePlugin.setIR != "function") return

		this.oActivePlugin.setIR(sIR);
	},

	$AFTER_SET_IR : function(sIR, bDontAddUndoHistory){
		bDontAddUndoHistory = bDontAddUndoHistory || false;
		if(!bDontAddUndoHistory) this.oApp.exec("RECORD_UNDO_ACTION", ["SET CONTENTS"]);
	},

	$ON_REGISTER_EDITING_AREA : function(oEditingAreaPlugin){
		this.oEditingMode[oEditingAreaPlugin.sMode] = oEditingAreaPlugin;
		this.attachDocumentEvents(oEditingAreaPlugin.oEditingArea);
	},

	$ON_MSG_EDITING_AREA_RESIZE_STARTED : function(){
		this.oActivePlugin.elEditingArea.style.display = "none";
		
		this.iStartingHeight = parseInt(this.elEditingAreaContainer.style.height);
	},
	
	$ON_RESIZE_EDITING_AREA: function(ipNewWidth, ipNewHeight){
		var iNewWidth = parseInt(ipNewWidth);
		var iNewHeight = parseInt(ipNewHeight);

		if(iNewWidth < this.niMinWidth) iNewWidth = this.niMinWidth;
		if(iNewHeight < this.nMinHeight) iNewHeight = this.nMinHeight;
	
		if(ipNewWidth) this.elEditingAreaContainer.style.width = iNewWidth + "px";
		if(ipNewHeight) this.elEditingAreaContainer.style.height = iNewHeight + "px";
	},

	$ON_RESIZE_EDITING_AREA_BY : function(ipWidthChange, ipHeightChange){
		var iWidthChange = parseInt(ipWidthChange);
		var iHeightChange = parseInt(ipHeightChange);

		var iWidth = this.elEditingAreaContainer.style.width?parseInt(this.elEditingAreaContainer.style.width)+iWidthChange:null;
		var iHeight = this.elEditingAreaContainer.style.height?this.iStartingHeight+iHeightChange:null;

		this.oApp.exec("RESIZE_EDITING_AREA", [iWidth, iHeight]);
	},
	
	$ON_MSG_EDITING_AREA_RESIZE_ENDED : function(FnMouseDown, FnMouseMove, FnMouseUp){
		this.oActivePlugin.elEditingArea.style.display = "block";
		this._setEditingAreaDimension();
	},

	_setEditingAreaDimension : function(){
		this.oActivePlugin.elEditingArea.style.height = this.elEditingAreaContainer.style.height;
		this.oActivePlugin.elEditingArea.style.width = this.elEditingAreaContainer.style.width;
	},
	
	attachDocumentEvents : function(doc){
		this.oApp.registerBrowserEvent(doc, "click", "EVENT_EDITING_AREA_CLICK");
		this.oApp.registerBrowserEvent(doc, "mousedown", "EVENT_EDITING_AREA_MOUSEDOWN");
		this.oApp.registerBrowserEvent(doc, "mousemove", "EVENT_EDITING_AREA_MOUSEMOVE");
		this.oApp.registerBrowserEvent(doc, "mouseup", "EVENT_EDITING_AREA_MOUSEUP");
		this.oApp.registerBrowserEvent(doc, "keydown", "EVENT_EDITING_AREA_KEYDOWN");
		this.oApp.registerBrowserEvent(doc, "keypress", "EVENT_EDITING_AREA_KEYPRESS");
		this.oApp.registerBrowserEvent(doc, "keyup", "EVENT_EDITING_AREA_KEYUP");
	},

	getIR : function(){
		return this.oActivePlugin.getIR();
	},

	setIR : function(sIR, bDontAddUndo){
		this.oApp.exec("SET_IR", [sIR, bDontAddUndo]);
	},
	
	getEditingMode : function(){
		return this.oActivePlugin.sMode;
	}
});
//}
