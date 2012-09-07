var globalutils = require("./utils.global");
var strutils = require("./utils.string");
var urlutils = require("./utils.url");

/**
 * Common function to obtain distance between points
 *
 * @param {Array} point1. array of two positions, [lat, lon]
 * @param {Array} point2. array of two positions, [lat, lon]
 * @param {Number} earthRadius
 * @return {Number}
 */	
function Distance(point1, point2, R){
	var dLat = (point2[0]-point1[0])*Math.PI/180;
	var dLon = (point2[1]-point1[1])*Math.PI/180;
	point1[0] = point1[0]*Math.PI/180;
	point2[0] = point2[0]*Math.PI/180;

	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(point1[0]) * Math.cos(point2[0]); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	return R * c;
}

/**
 * Prepare object to send by querystring params
 *
 * @param {Object} obj
 * @return {String}
 */	
function queryfy(obj,options){
	if(obj){
		var q = [];
		for(var k in obj){
			q.push("&",options[k],"=",obj[k]);
		}
		return q.join("");
	}
	return "";
}

/**
 * Common function for geocoding and reverse geocoding
 *
 * @param {String or Array} query
 * @param {Number} idx of the current processing geoservice
 * @param {String} type "" for geocoding or "r" for reverse geocoding
 * @param {Object} options
 * @param {Object} callback
 */	
function getPoint(query,idx,type,options,callback){
	if(geoservices && geoservices.length && idx<geoservices.length){
		var url = geoservices[idx][type+"url"];
		if(typeof query=="object"){
			query = query.join(",");
		}
		var queryparams = queryfy(options,geoservices[idx].options);
		urlutils.get(url+encodeURIComponent(query.toUnicode())+queryparams,function(js){
			if(js){
				
				try{
					js = JSON.parse(js);
				}catch(e){
					console.log(js)
					getPoint(query,idx+1,type,queryparams,callback);
				}

				var n = js;
				var r = {};

				var sib = geoservices[idx].point.split(".");

				//latitude, longitude
				for(var i=0;i<sib.length;i++){
					if(n && n[sib[i]]){
						n = n[sib[i]];
					}
				}

				if(n && n[geoservices[idx].lat] && n[geoservices[idx].lon]){
					r["lat"] = n[geoservices[idx].lat]*1;
					r["lon"] = n[geoservices[idx].lon]*1;
				}

				//formated address
				if(geoservices[idx].point!=geoservices[idx].address_components){
					sib = geoservices[idx].address_components.split(".");
					n = js;
					for(var i=0;i<sib.length;i++){
						if(n && n[sib[i]]){
							n = n[sib[i]];
						}
					}
				}	

				sib = geoservices[idx].address.split(",");

				for(var i=0;i<sib.length;i++){
					if(n && n[sib[i]]){
						if(typeof n[sib[i]]=="string"){
							for(var k in geoservices[idx].translate){
								if(geoservices[idx].translate[k]==sib[i]){
									break
								}
							}
							r[k]=n[sib[i]];
						}else{
							for(var l=0;l<n[sib[i]].length;l++){
								for(var k in geoservices[idx].translate){
									if(n[sib[i]][l].types.contains(geoservices[idx].translate[k])>0){
										r[k]=n[sib[i]][l].long_name;
									}
								}
							}
						}
					}
				}						
				if(typeof(callback)=="function"){
					callback(r);
				}else{
					console.log(r);
				}
			}else{
				getPoint(query,idx+1,type,queryparams,callback);
			}
		});
	}else{
		if(typeof(callback)=="function"){
			callback(null);
		}
	}
}

/**
 * Checks if a point is inside a circle
 *
 * @param {Array} point. array of two positions, [lat, lon]
 * @param {Array} center. array of two positions, [lat, lon]
 * @param {Number} radius.  [lat, lon]
 * @param {Number} earthRadius. optional, defaults is 6371
 * @return {Boolean}
 */	
exports.isInside = function(point, center, radius, earthRadius){
	var R = earthRadius && strutils.isNumber(earthRadius) ? earthRadius : 6371;
	
	if(!globalutils.isValid(point) || !globalutils.isValid(center) || !globalutils.isValid(radius)
		|| !point.length || !point.length==2 || !strutils.isNumber(point[0]) || !strutils.isNumber(point[1])
		|| !center.length || !center.length==2 || !strutils.isNumber(center[0]) || !strutils.isNumber(center[1])
		|| !strutils.isNumber(radius)
		){
		console.log("isInside() param errors");
		return;
	}

	return Distance(point,center,R)<=radius?true:false;
}

/**
 * Return distance between two points
 *
 * @param {Array} point1. array of two positions, [lat, lon]
 * @param {Array} point2. array of two positions, [lat, lon]
 * @param {Number} earthRadius. optional, defaults is 6371
 * @return {Number}
 */	
exports.getDistance = function(point1, point2, earthRadius){
	var R = earthRadius && strutils.isNumber(earthRadius) ? earthRadius : 6371;
	if(!globalutils.isValid(point1) || !globalutils.isValid(point2) || !globalutils.isValid(R)
		|| !point1.length || !point1.length==2 || !strutils.isNumber(point1[0]) || !strutils.isNumber(point1[1])
		|| !point2.length || !point2.length==2 || !strutils.isNumber(point2[0]) || !strutils.isNumber(point2[1])
		){
		console.log("isInside() param errors");
		return null;
	}

	return Distance(point1,point2,R);
}

/**
 * Geocodes address trying some online services
 *
 * @param {String} address
 * @param {Object} options
 * @param {Function} callback
 * @return {Object}
 */	
exports.geocode = function(address,options,callback){
	if(typeof(options)=="function"){
		callback = options;
	}
	if(!globalutils.isValid(address)){
		console.log("geocode() param errors");
		return;
	}

	getPoint(address,0,"",options,callback);
}


/**
 * Get an address from a point from some online services
 *
 * @param {Number} latitude
 * @param {Number} longitude
 * @param {Object} options
 * @param {Function} callback
 * @return {String}
 */	
exports.rgeocode = function(latitude,longitude,options,callback){
	if(typeof(options)=="function"){
		callback = options;
	}

	if(!globalutils.isValid(latitude) || !globalutils.isValid(longitude)){
		console.log("rgeocode() param errors");
		return;
	}

	getPoint([latitude,longitude],0,"r",options,callback);
}

//geoservices template for common processing
var geoservices = [
	{
		"id" : "yahoo",
		"url" : "http://where.yahooapis.com/geocode?flags=j&q=",
		"rurl" : "http://where.yahooapis.com/geocode?gflags=r&flags=j&q=",
		"point" : "ResultSet.Results.0",
		"address_components" : "ResultSet.Results.0",
		"lat" : "latitude",
		"lon" : "longitude",
		"address" : "house,street,postal,city,county,state,country",
		"translate" : {
			"number" : "house",
			"street" : "street",
			"city" : "city",
			"postal" : "postal",
			"county" : "county",
			"state" : "state",
			"country" : "country"

		},
		"options" : {
			"locale" : "locale"
		}		
	},
	{
		"id" : "google",
		"url" : "http://maps.googleapis.com/maps/api/geocode/json?sensor=false&address=",
		"rurl" : "http://maps.googleapis.com/maps/api/geocode/json?sensor=false&latlng=",
 		"point" : "results.0.geometry.location",
 		"address_components" : "results.0",
		"lat" : "lat",
		"lon" : "lng",
		"address" : "address_components",
		"translate" : {
			"number" : "street_number",
			"street" : "route",
			"city" : "locality",
			"postal" : "postal_code",
			"county" : "administrative_area_level_2",
			"state" : "administrative_area_level_1",
			"country" : "country"

		},
		"options" : {
			"locale" : "language"
		}
	} 
]