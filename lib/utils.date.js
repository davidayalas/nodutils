var globalutils = require("./utils.global.js");

/**
 * Get the difference between to dates
 *
 * @param {String,Date Object} date1
 * @param {String,Date Object} date2
 * @param {String} unit [optional] "d": days, "h": hours, "m": minutes
 * @return {String}
 */	
exports.diff = function(date1, date2, unit){

	if(typeof(date1)=="string"){date1 = new Date(date1);}
	if(typeof(date2)=="string"){date2 = new Date(date2);}
	if(!globalutils.isValid(date2)){date2 = new Date();}
	if(!globalutils.isValid(unit)){unit = "millis";}
	if(!globalutils.isValid(date1)){
		console.log("invalid value for date parameter");
		return;		
	}

	date1 = date1.getTime();
	date2 = date2.getTime();

	switch(unit){
		case "d":
			return (date2-date1)/(24*60*60*1000);
		case "h":
			return (date2-date1)/(60*60*1000);
		case "m":
			return (date2-date1)/(60*1000);
		case "s":
			return (date2-date1)/(1000);
		default:
			return date2-date1; 
	}
}
