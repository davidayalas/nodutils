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