var globalutils = require("./utils.global");
var strutils = require("./utils.string");

var self = this;

/**
 * Return max value (number) in array
 *
 * @param {Array} array or {None} if is in array object
 * @return {Number}
 */	
exports.max = function(array){
    return Math.max.apply(Math, array);
}
Array.prototype.max = function(){return self.max(this);}

/**
 * Return min value (number) in array
 *
 * @param {Array} array or {None} if is in array object
 * @return {Number}
 */	
exports.min = function(array){
    return Math.min.apply(Math,array);
}
Array.prototype.min = function(array){return self.min(this);}

/**
 * Return uniques values in array
 *
 * @param {Array} array or {None} if is in array object
 * @return {Array}
 */	
exports.uniques = function(a){	
	a = a.sort();
	var r=[];
	for(var i=0,z=a.length;i<z;i++){
		a[i]!=a[i+1] ? r.push(a[i]) : ""	
	}
	return r;
}
Array.prototype.uniques = function(array){return self.uniques(this);}

/**
 * Aggregate all repeated values in one dimension arrays
 *
 * @param {Array} array or {None} if is in array object
 * @return {Array} sorted array in descendant way. Each item has two positions: [key,count]
 */	
exports.aggregate = function(a){
	a = a.sort();
	var r={};
	for(var i=0,z=a.length;i<z;i++){
		!r[a[i]] ? r[a[i]]=1 : r[a[i]]++;
	}
	var ra = Object.keys(r).map(function(key){return [key,r[key]];}); 
	ra.sort(function(a,b){
		return b[1]-a[1];
	})
	return ra;	
}
Array.prototype.aggregate = function(array){return self.aggregate(this);}

/**
 * Return number of ocurrences of value to search. Ignore case (i) and drop diacritics (d) flags available
 *
 * @param {Array} array or {None} if is in array object
 * @param {String or Number} value
 * @param {String} flags
 * @return {Value} 0 or >0
 */	
exports.contains = function(array,value,flags){
	var i="";
	if(globalutils.isValid(flags) && !strutils.isNumber(value)){
		if(flags.indexOf("i")>-1){
			value = value.toLowerCase();
		}
		if(flags.indexOf("d")>-1){
			value = value.dropAccents();
		}
	}
	return array.filter(function(val){
		if(globalutils.isValid(flags) && !strutils.isNumber(val)){
			if(flags.indexOf("i")>-1){
				val = val.toLowerCase();
			}
			if(flags.indexOf("d")>-1){
				val = val.dropAccents();
			}
		}
		if(val===value){
			return value;
		}
		return null;
	}).length>0?true:false;
}
Array.prototype.contains = function(value,flags){return self.contains(this,value,flags);}
