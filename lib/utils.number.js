/**
 * Get Integer from string
 *
 * @param {String} number
 * @return {Integer}
*/
exports.stoi = function(number){return stoi(number);}
String.prototype.stoi = function(){return stoi(this);}
var stoi = function(number){
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
exports.stof = function(number,decimals){return stof(number,decimals);}
String.prototype.stof = function(decimals){return stof(this,decimals);}
var stof = function(number,decimals){
	if(!isNaN(number)){
		if(!isNaN(decimals)){
			console.log(JSON.stringify(Number))
			return round(parseFloat(number),decimals);
		}
		return parseFloat(number);
	}
	return null;
}

/**
 * Rounds to N decimals
 *
 * @param {Number} number
 * @param {Number} decimals
 * @return {Number}
*/
exports.round = function(number,decimals){return round(number,decimals);}
Number.prototype.round = function(decimals){return round(this,decimals);}
var round = function(number,decimals){
	if(!isNaN(number)){
		var d = 1;
		if(!isNaN(decimals)){
			d = Math.pow(10,decimals)
		}
		return Math.round(number * d)/d;
	}
	return null;
}