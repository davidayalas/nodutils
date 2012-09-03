var globalutils = require("./utils.global");
var charmap = require("./utils.string.entities").entities;
var numutils = require("./utils.number");
var self = this;

/**
 * Trim all spaces
 *
 * @param {String} str
 * @return {String}
 */	
exports.trim = function(str){
	return str.replace(/^\s+|\s+$/g,"");
}
String.prototype.trim = function(){return self.trim(this);}

/**
 * Trim spaces on the left side
 *
 * @param {String} str
 * @return {String}
 */	
exports.ltrim = function(str){
	return str.replace(/^\s+/,"");
}
String.prototype.ltrim = function(){return self.ltrim(this);}


/**
 * Trim spaces on the right side
 *
 * @param {String} str
 * @return {String}
 */	
exports.rtrim = function(str){
	return str.replace(/\s+$/,"");
}
String.prototype.rtrim = function(){return self.rtrim(this);}

/**
 * Get Integer from string
 *
 * @param {String} number
 * @return {Integer}
*/
exports.toi = function(number){
	if(!isNaN(number)){
		return parseInt(number);
	}
	return null;
}
String.prototype.toi = function(){return self.toi(this);}

/**
 * Get Float from string
 *
 * @param {String} number
 * @param {Number} decimals [optional]
 * @return {Integer}
*/
exports.tof = function(number,decimals){
	if(!isNaN(number)){
		if(!isNaN(decimals)){
			return numutils.round(parseFloat(number),decimals);
		}
		return parseFloat(number);
	}
	return null;
}
String.prototype.tof = function(decimals){return self.tof(this,decimals);}

/**
 * Decode HTML Entities from num char
 *
 * @param {String} str
 */	
exports.fromHtmlNum = function(text){
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
String.prototype.fromHtmlNum = function(){return self.fromHtmlNum(this);}

/**
 * Decode HTML Entities
 *
 * @param {String} str
 * @return {String}
 */
exports.fromHtml = function(str){
	for(var k in charmap){
		str = str.replace(new RegExp(charmap[k].html,"g"),k);
	}
	return str;
}
String.prototype.fromHtml = function(){return self.fromHtml(this);}

/**
 * Encode string to html entities (see utils.string.entities)
 *
 * @param {String} str
 * @return {String}
 */
exports.toHtml = function(str){
	for(var k in charmap){
		str = str.replace(new RegExp(k,"g"),charmap[k].html);
	}
	return str;
}
String.prototype.toHtml = function(){return self.toHtml(this);}


/**
 * Translate to unicode
 *
 * @param {String} str
 * @return {String}
 */
exports.toUnicode = function(str){
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
String.prototype.toUnicode = function(){return self.toUnicode(this);}

/**
 * Decode from unicode
 *
 * @param {String} str
 * @return {String}
 */
exports.decodeUnicode = function(str){
	var r = /\\u([\d\w]{4})/gi;
	str = str.replace(r, function(match, grp) {
    	return String.fromCharCode(parseInt(grp, 16)); } 
    );
    return str;
}
String.prototype.decodeUnicode = function(){return self.decodeUnicode(this);}

/**
 * Drop accents and diacritics
 *
 * @param {String} str
 * @return {String}
 */
exports.dropDiacritics = function(str){
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
String.prototype.dropDiacritics = function(){return self.dropDiacritics(this);}
exports.dropAccents = function(str){return self.dropDiacritics(str);}
String.prototype.dropAccents = function(){return self.dropDiacritics(this);}


/**
 * Test if a string is a number
 *
 * @param {String} str
 * @return {Boolean}
 */
exports.isNumber = function(str){
	return !isNaN(str);
}
String.prototype.isNumber = function(){return self.isNumber(this);}

/**
 * Strip html tags
 *
 * @param {String} str
 * @return {String}
 */
exports.stripHtml = function(str){
	return str
			  .replace(/<!--([.\s]*?)-->/g," ")
			  .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/ig," ")
			  //.replace(/<noscript\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/noscript>/ig," ")
			  .replace(/<style\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/style>/ig," ")
			  .replace(/<[^>]*>/g," ")
			  .replace(/[ \s]+/g," ")
	;
}
String.prototype.stripHtml = function(){return self.stripHtml(this);}

/**
 * Count ocurrences of a substring
 *
 * @param {String} str
 * @param {String} substr
 * @param {String} flags > "i" ignore case, "d" drop accents
 * @return {Number}
 */
exports.count = function(str,substr,flags){
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
String.prototype.count = function(substr,flags){return self.count(this,substr,flags);}

/**
 * Reverse a string
 *
 * @param {String} str
 * @return {Number}
 */
exports.reverse = function(str){
	if(globalutils.isValid(str)){
		return str.split("").reverse().join("");
	}
	return null;
}
String.prototype.reverse = function(str){return self.reverse(this);}