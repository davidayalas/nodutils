/**
 * Return max value (number) in array
 *
 * @param {Array} array or {None} if is in array object
 * @return {Number}
 */	
exports.max = function(array){return max(array);}
Array.prototype.max = function(){return max(this);}
var max = function(array){
    return Math.max.apply(Math, array);
};

/**
 * Return min value (number) in array
 *
 * @param {Array} array or {None} if is in array object
 * @return {Number}
 */	
exports.min = function(array){return min(array);}
Array.prototype.min = function(array){return min(this);}
var min = function(array){
    return Math.min.apply(Math,array);
};

/**
 * Return uniques values in array
 *
 * @param {Array} array or {None} if is in array object
 * @return {Array}
 */	
exports.uniques = function(array){return uniques(array);}
Array.prototype.uniques = function(array){return uniques(this);}
var uniques = function(a){
	a = a.sort();
	var r=[];
	for(var i=0,z=a.length;i<z;i++){
		a[i]!=a[i+1] ? r.push(a[i]) : ""	
	}
	return r;
};

/**
 * Aggregate all repeated values in one dimension arrays
 *
 * @param {Array} array or {None} if is in array object
 * @return {Array} sorted array in descendant way. Each item has two positions: [key,count]
 */	
exports.aggregate = function(array){return aggregate(array);}
Array.prototype.aggregate = function(array){return aggregate(this);}
var aggregate = function(a){
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
};

