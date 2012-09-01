var globalutils = require("./utils.global");
var charmap = require("./utils.string.entities").entities;
var numutils = require("./utils.number");

/**
 * Trim all spaces
 *
 * @param {String} str
 * @return {String}
 */	
exports.trim = function(str){return trim(str);}
String.prototype.trim = function(){return trim(this);}
var trim=function(str) {
	return str.replace(/^\s+|\s+$/g,"");
}

/**
 * Trim spaces on the left side
 *
 * @param {String} str
 * @return {String}
 */	
exports.ltrim = function(str){return ltrim(str);}
String.prototype.ltrim = function(){return ltrim(this);}
var ltrim=function(str) {
	return str.replace(/^\s+/,"");
}


/**
 * Trim spaces on the right side
 *
 * @param {String} str
 * @return {String}
 */	
exports.rtrim = function(str){return rtrim(str);}
String.prototype.rtrim = function(){return rtrim(this);}
var rtrim=function(str) {
	return str.replace(/\s+$/,"");
}

/**
 * Get Integer from string
 *
 * @param {String} number
 * @return {Integer}
*/
exports.toi = function(number){return toi(number);}
String.prototype.toi = function(){return toi(this);}
var toi = function(number){
	//console.log(isNaN(number));
	if(!isNaN(number)){
		return parseInt(number);
	}
	return null;
}

/**
 * Get Float from string
 *
 * @param {String} number
 * @param {Number} decimals [optional]
 * @return {Integer}
*/
exports.tof = function(number,decimals){return tof(number,decimals);}
String.prototype.tof = function(decimals){return tof(this,decimals);}
var tof = function(number,decimals){
	if(!isNaN(number)){
		if(!isNaN(decimals)){
			return numutils.round(parseFloat(number),decimals);
		}
		return parseFloat(number);
	}
	return null;
}

/**
 * Decode HTML Entities from num char
 *
 * @param {String} str
 */	
exports.fromHtmlNum = function(str){return fromHtml(str);}
String.prototype.fromHtml = function(){return fromHtml(this);}
var fromHtml=function(text){
  var decoded = [];
  var entity = "";
  for (var i=0; i<text.length; i++) {
	if(text.slice(i,i+1)=="&"){
		entity = "";	
		while(text.slice(i,i+1)!=";"){
			if(text.slice(i,i+1)!="#" && text.slice(i,i+1)!="&"){
				entity += text.slice(i,i+1);
			}
			i++;
		}
		decoded.push(String.fromCharCode(entity));
	}else{
		decoded.push(text.slice(i,i+1)); 
	}
  }
  return decoded.join("");
}

/**
 * Decode HTML Entities
 *
 * @param {String} str
 * @return {String}
 */
exports.fromHtml = function(str){return fromHtml(str);}
String.prototype.fromHtml = function(){return fromHtml(this);}
var fromHtml = function(str) {
	for(var k in charmap){
		str = str.replace(new RegExp(charmap[k].html,"g"),k);
	}
	return str;
}

/**
 * Encode string to html entities (see utils.string.entities)
 *
 * @param {String} str
 * @return {String}
 */
exports.toHtml = function(str){return toHtml(str);}
String.prototype.toHtml = function(){return toHtml(this);}
var toHtml = function(str) {
	for(var k in charmap){
		str = str.replace(new RegExp(k,"g"),charmap[k].html);
	}
	return str;
}


/**
 * Translate to unicode
 *
 * @param {String} str
 * @return {String}
 */
exports.toUnicode = function(str){return toUnicode(str);}
String.prototype.toUnicode = function(){return toUnicode(this);}
var toUnicode = function(str) {
  var unicodeString = '';
  str = str.toLowerCase();
  var theUnicode = "";
  for (var i=0; i < str.length; i++) {
	if(str.charCodeAt(i)>=128){
		theUnicode = str.charCodeAt(i).toString(16);
		while (theUnicode.length < 4) {
			theUnicode = '0' + theUnicode;
		}	
		theUnicode = '\\u' + theUnicode;
		unicodeString += theUnicode;
	}else{
		unicodeString += str.slice(i,i+1);
	}
  }
  return unicodeString;
}

/**
 * Decode from unicode
 *
 * @param {String} str
 * @return {String}
 */
exports.decodeUnicode = function(str){return decodeUnicode(str);}
String.prototype.decodeUnicode = function(){return decodeUnicode(this);}
var decodeUnicode = function(str) {
	var r = /\\u([\d\w]{4})/gi;
	str = str.replace(r, function(match, grp) {
    	return String.fromCharCode(parseInt(grp, 16)); } 
    );
    return str;
}

/**
 * Drop accents and diacritics
 *
 * @param {String} str
 * @return {String}
 */
exports.dropDiacritics = function(str){return dropAccents(str);}
String.prototype.dropDiacritics = function(){return dropAccents(this);}
exports.dropAccents = function(str){return dropAccents(str);}
String.prototype.dropAccents = function(){return dropAccents(this);}
var dropAccents=function(str){
	try{
		str=decodeURIComponent(str);
	}catch(e){
		//str=str.toLowerCase();
	}
	var rExps=[
		{re:/[\xE0-\xE6]/g, ch:'a'},
		{re:/[\xC0-\xC6]/g, ch:'A'},
		{re:/[\xE8-\xEB]/g, ch:'e'},
		{re:/[\xC8-\xCB]/g, ch:'E'},
		{re:/[\xEC-\xEF]/g, ch:'i'},
		{re:/[\xCC-\xCF]/g, ch:'I'},
		{re:/[\xF2-\xF6]/g, ch:'o'},
		{re:/[\xD2-\xD6]/g, ch:'O'},
		{re:/[\xF9-\xFC]/g, ch:'u'},
		{re:/[\xD9-\xDC]/g, ch:'u'},
		{re:/[\xF1]/g, ch:'n'},
		{re:/[\xD1]/g, ch:'N'},
		{re:/[\xE7]/g, ch:'c'},
		{re:/[\xC7]/g, ch:'C'} 
	];

	for(var i=0, len=rExps.length; i<len; i++){
		str=str.replace(rExps[i].re, rExps[i].ch);
	}
	return str;
}

/**
 * Test if a string is a number
 *
 * @param {String} str
 * @return {Boolean}
 */
exports.isNumber = function(str){return isNumber(str);}
String.prototype.isNumber = function(){return isNumber(this);}
var isNumber = function(str){
	return !isNaN(str);
}

/**
 * Strip html tags
 *
 * @param {String} str
 * @return {String}
 */
exports.stripHtml = function(str){return stripHtml(str);}
String.prototype.stripHtml = function(){return stripHtml(this);}
var stripHtml = function(str){
	return str
			  .replace(/<!--([.\s]*?)-->/g," ")
			  .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/ig," ")
			  //.replace(/<noscript\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/noscript>/ig," ")
			  .replace(/<style\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/style>/ig," ")
			  .replace(/<[^>]*>/g," ")
			  .replace(/[ \s]+/g," ")
	;
}

/**
 * Count ocurrences of a substring
 *
 * @param {String} str
 * @param {String} substr
 * @param {String} flags > "i" ignore case, "d" drop accents
 * @return {Number}
 */
exports.count = function(str,substr,flags){return count(str,substr,flags);}
String.prototype.count = function(substr,flags){return count(this,substr,flags);}
var count = function(str,substr,flags){
	var i="";
	if(globalutils.isValid(flags)){
		if(flags.indexOf("i")>-1){
			i = "i";
		}
		if(flags.indexOf("d")>-1){
			str = str.dropAccents();
		}
	}
	var re = new RegExp(substr,i+"g");
	var t=str.match(re);
	if(t){
		return t.length;
	}
	return 0;
}

/**
 * Reverse a string
 *
 * @param {String} str
 * @return {Number}
 */
exports.reverse = function(str){return reverse(str);}
String.prototype.reverse = function(str){return reverse(this);}
var reverse = function(str){
	if(globalutils.isValid(str)){
		return str.split("").reverse().join("");
	}
	return null;
}

/**
 * Find a substring in a string
 *
 * @param {String} substr
 * @param {Number} start
 * @param {Number} end
 * @return {String}
 */
/*exports.find = function(substr,start,end){return find(substr);}
String.prototype.find = function(start,end){return find(this,start,end);}
var find = function(substr,start,end){
	start=0;
	end=substr.length;
	if(!isNaN(start)){start=parseInt(start);}
	if(!isNaN(end)){end=parseInt(end);}

	var str = substr.slice(start,end);
	
	var found = false;
	var pre = "";
	var post = "";
	var iof = 0;
	var re = new RegExp(substr,"ig");
	var count = 0;
	var t=substr.match(re);
	if(t){count=t.length;}
	
	if(count>0){
		iof = str.indexOf(substr);
		pre = str.slice(0,iof+substr.length);
		post = str.slice(iof+substr.length);
	}else{
		iof = -1;
		pre = str.slice(0);
	}
	
	return {"pos":iof,"count":count,"token" : [pre, post]}
}*/

