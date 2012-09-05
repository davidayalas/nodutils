var globalutils = require("./utils.global.js");

/*
* Parse url
*
* @param {String} url
* @param {Boolean} force (to force processing)
* @return {Object}
*/
exports.parse = function(url,force){parse(url,force);}
var parse = function(url,force){
	force = globalutils.isValid(force) && force==true?true:false;
	var o = require("url").parse(url);
	var pass = true;
	var errors = [];
	if(!globalutils.isValid(url)){errors.push("invalid url");}

	if(!o.protocol || force){
			var host = url.slice(0,url.indexOf("/"));
			
			switch(host){
				case "http:":
					o.protocol="http:";
					url = url.replace("http://","");
					break;
				case "https:":
					o.protocol="https:";
					url = url.replace("https://","");
					break;
				default:
					o.protocol="http:";
					url = url.replace("http://","");
			}

			o.host = url;

			if(url.indexOf(":")>-1){
				o.host = url.slice(0,url.indexOf(":"));
				o.port = url.slice(url.indexOf(":")+1);
				if(url.indexOf("/")>-1){
					url = o.host + o.port.slice(o.port.indexOf("/"));
					o.port = o.port.slice(0,o.port.indexOf("/"));
				}
			}
			o.path = "/";				
			o.pathname = "/";
			o.search ="";
			if(url.indexOf("/")>-1){
				o.host = url.slice(0,url.indexOf("/"));				
				o.path = url.slice(url.indexOf("/"));				
				o.pathname = o.path;
				if(url.indexOf("?")>-1){
					o.search = url.slice(url.indexOf("?"));					
				}
			}
			o.href = o.protocol + "//" + o.host + o.path + o.search;
	}
	o.protocol = o.protocol.slice(0,o.protocol.length-1);
	if(!o.host){errors.push("missing host in url");}
	if(!o.path){o.path = "/";}

	return {"tokens" : o, "errors" : errors};	
}

/*
* GET url content
*
* @param {String} url
* @param {Object} options [optional]
*	 @key {string} encoding
* @param {String} callback
*/
exports.get = function(url, options, callback){
	httpGetPost(url,options,callback,"get");
}

/*
* POST data to url
*
* @param {String} url
* @param {Object} options [optional] 
*	 @key {string} encoding
*	 @key {string} post_data
* @param {String} callback (with params "data","statusCode","headers")
*/
exports.post = function(url, options, callback){
	httpGetPost(url,options,callback,"post");
}

function httpGetPost(url,options,callback,method){
	if(!globalutils.isValid(url) && !globalutils.isValid(options)){
		console.log("Unable to process http request without options");
		return;
	}

	//check and set up of request params
	var request_options = null;
	if(!globalutils.isValid(url) || typeof(url)=="object"){
		request_options = url;
		url = null;
	}

	if(!globalutils.isValid(options) || typeof(options)=="function"){
		callback = options;
		options = {};
		if(globalutils.isValid(request_options)){
			options.post_data = globalutils.isValid(request_options.post_data)?request_options.post_data:"";
			options.encoding = globalutils.isValid(request_options.post_data)?request_options.encoding:"utf-8";
			delete request_options.post_data;
			delete request_options.encoding;
		}
	}

	method = globalutils.isValid(method)?method.toUpperCase():"GET";
	var force = globalutils.isValid(options) && options.forceparse==true?true:false; //in case of proxy servers, better to force parse with "true" value

	var o = {};

	if(globalutils.isValid(url)){
		o = parse(url,force);
		if(o.errors.length>0){return o.errors.join(" ");}
		request_options = {"host": o.tokens.host,"port": o.tokens.port,"path": o.tokens.path,"method": method.toUpperCase()};
	}else if(typeof(request_options)=="object"){
		o.tokens = {};
		o.tokens.protocol = globalutils.isValid(request_options.protocol)?request_options.protocol:"http";
	}	

	request_options["host"] = globalutils.isValid(options.host)?options.host:request_options["host"];
	request_options["port"] = globalutils.isValid(options.port)?options.port:request_options["port"];
	request_options["path"] = globalutils.isValid(options.path)?options.path:request_options["path"];
	request_options["headers"] = globalutils.isValid(options.headers)?options.headers:"";
	request_options["auth"] = globalutils.isValid(options.auth)?options.auth:"";

	//other options
	for(var k in options){
		if(!request_options[k]){
			request_options[k] = options[k];
		}
	}

	if(!globalutils.isValid(request_options.host) || request_options.host.length==0){
		console.log("Not enough params to process request");
		return;
	}
	
	if(typeof(callback)!="function"){callback=function(data){console.log(data);}}

	//POST METHOD
	var post_data = "";
	if(method=="POST"){
		request_options["method"] = "POST";
		if(options.post_data && options.post_data.data){
			post_data = options.post_data.data;
		}else if(options.post_data){
			post_data = require('querystring').stringify(options.post_data);
		}
	}

	//do request
	var request = require(o.tokens.protocol).request(request_options,function(resp){
		var data = [];
		if(options && options.encoding && options.encoding.indexOf("iso")>-1){options.encoding="binary";}
		resp.setEncoding(options.encoding);
		resp.on('data', function (chunk) {
			data.push(chunk);
		});
		resp.on('end',function(){
			if(typeof(callback)=="function"){
				callback(data.join(""),resp.statusCode,resp.headers);
			}else{
				console.log(data.join(""));
			}
		});
	});

	if(method=="POST"){
		request.write(post_data);
	}
	request.end();
	request.on('error', function(e) {
  		console.log("error " + e.message);
		if(typeof(callback)=="function"){
			callback(null);
		}
	});
}