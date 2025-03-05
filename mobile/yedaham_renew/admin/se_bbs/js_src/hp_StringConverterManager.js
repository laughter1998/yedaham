//{
/**
 * @fileOverview This file contains Husky plugin that takes care of the operations related to string conversion. Ususally used to convert the IR value.
 * @name hp_StringConverterManager.js
 */
nhn.husky.StringConverterManager = $Class({
	name : "StringConverterManager",

	oConverters : null,

	$init : function(){
		this.oConverters = {};
	},
	
	$BEFORE_MSG_APP_READY : function(){
		this.oApp.exec("ADD_APP_PROPERTY", ["applyConverter", $Fn(this.applyConverter, this).bind()]);
		this.oApp.exec("ADD_APP_PROPERTY", ["addConverter", $Fn(this.addConverter, this).bind()]);
	},

	applyConverter : function(sRuleName, sContent){
		var aConverters = this.oConverters[sRuleName];
		if(!aConverters) return sContent;

		for(var i=0; i<aConverters.length; i++) sContent = aConverters[i](sContent);

		return sContent;
	},

	addConverter : function(sRuleName, funcConverter){
		var aConverters = this.oConverters[sRuleName];
		if(!aConverters) this.oConverters[sRuleName] = [];

		this.oConverters[sRuleName][this.oConverters[sRuleName].length] = funcConverter;
	}
});
//}