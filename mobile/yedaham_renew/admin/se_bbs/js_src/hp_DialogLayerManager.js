//{
/**
 * @fileOverview This file contains Husky plugin that takes care of the draggable layers
 * @name hp_DialogLayerManager.js
 */
nhn.husky.DialogLayerManager = $Class({
	name : "DialogLayerManager",
	aMadeDraggable : null,
	aOpenedLayers : null,

	$init : function(){
		this.aMadeDraggable = [];
		this.aOpenedLayers = [];
	},
	
	$ON_SHOW_DIALOG_LAYER : function(oLayer, bModal){
		oLayer = $(oLayer);
		bModal = $(bModal) || false;
		if(!oLayer) return;

		if($A(this.aOpenedLayers).has(oLayer)) return;

		this.oApp.exec("POSITION_DIALOG_LAYER", [oLayer]);

		$A(this.aOpenedLayers).push(oLayer);
		
		if(!$A(this.aMadeDraggable).has(oLayer)){
			new nhn.DraggableLayer(oLayer, {bModal: bModal, iMinY: 0});
			this.aMadeDraggable[this.aMadeDraggable.length] = oLayer;
		}else{
			oLayer.style.display = "block";
		}
	},

	$ON_HIDE_LAST_DIALOG_LAYER : function(){
		this.oApp.exec("HIDE_DIALOG_LAYER", [this.aOpenedLayers[this.aOpenedLayers.length-1]]);
	},

	$ON_HIDE_ALL_DIALOG_LAYER : function(){
		for(var i=this.aOpenedLayers.length-1; i>=0; i--)
			this.oApp.exec("HIDE_DIALOG_LAYER", [this.aOpenedLayers[i]]);
	},

	$ON_HIDE_DIALOG_LAYER : function(oLayer){
		oLayer = $(oLayer);

		if(oLayer) oLayer.style.display = "none";
		this.aOpenedLayers = $A(this.aOpenedLayers).refuse(oLayer);
	},

	$ON_SET_DIALOG_LAYER_POSITION : function(oLayer, iTop, iLeft){
		oLayer.style.top = iTop;
		oLayer.style.left = iLeft;
	}
});
//}