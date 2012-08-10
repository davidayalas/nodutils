var globalutils = require("./utils.global");
var fileutils = require("./utils.file");
var strutils = require("./utils.string");
var dateutils = require("./utils.date");

var cache = {};
exports.PATH = DEFAULT_PATH ="./cache";
var firstime = true; 
var isPathNormalized = false;

/**
 * Get the cache path
 *
 * @return {String} path
 */	
exports.getPath = function(){
	if(!isPathNormalized){
		this.PATH = fileutils.getAbsolutePath(this.PATH);
		isPathNormalized=true;
	}
	return this.PATH;
}

/**
 * Set the cache path
 *
 * @param {String} path
 * @param {Function} callback
 */	
exports.setPath = function(path, callback){
	if(globalutils.isValid(path)){
		this.PATH=fileutils.getAbsolutePath(path);
		isPathNormalized=true;
		fileutils.createpath(path,callback);
	}else{
		console.log("invalid path");
	}
}

/**
 * Process cache get
 *
 * @param {String} data
 * @param {String} key
 * @param {String} expire
 * @param {Number} datediff
 * @param {Function} callback
 */	
function processGetCache(data,key,expire,datediff,callback){
	var v = false;
	if((expire>-1 && datediff<expire) || expire==-1){
		v = true;
	}else{
		fileutils.remove(key);
		delete cache[key];
	}
	var d=data;
	if(!v){
		d=null;
	}else{
		console.log("cache key '"+key+"' loaded from disk");
	}
	if(typeof(callback)=="function"){
		callback(d);
	}else{
		console.log(d);
	}
}

/**
 * Get content from cache
 *
 * @param {String} key
 * @param {Function} callback [optional]
 */	
exports.get = function(key, callback){
	//if(cache[key] && 1==2){
	var self = this;	
	if(cache[key]){
		var seconds = cache[key].expire;
		var diff = dateutils.diff(cache[key].moddate,new Date(),"s");
		console.log("cache key '"+key+"' loaded from memory");
		processGetCache(cache[key].content,key,seconds,diff,callback);
	}else{
		fileutils.getModTime(self.getPath()+"/"+key,function(moddate){
			if(moddate==null){ //doesn't exist
				if(typeof(callback)=="function"){
					callback(null);
				}else{
					console.log("cache key '" + key + "'' is null");
				}				
			}else{//exist
				fileutils.read(self.getPath()+"/"+key,function(data){
					if(data!=null){ //has content, seconds in first line
						var seconds = data.slice(0,data.indexOf("\r"));
						var diff = dateutils.diff(moddate,new Date(),"s");
						data = data.slice(data.indexOf("\r\n")+2)
						if(!cache[key]){
							cache[key] = {
								"expire" : seconds,
								"moddate" : moddate,
								"content" : data
							}
						}
						processGetCache(data,key,seconds,diff,callback);
					}else{
						if(typeof(callback)=="function"){
							callback(null);
						}else{
							console.log("cache key " + key + " is " + null);
						}				
					}
				});
			}
		});
	}
}

/**
 * Set content to cache
 *
 * @param {String} key
 * @param {String} data 
 * @param {Number} expiretime (in seconds)
 * @param {Function} callback [optional]
 */	
exports.set = function(key, data, expiretime, callback){
	var self = this;
	if(typeof(expiretime)=="function"){
		callback = expiretime;		
	}

	var ex=expiretime;
	if(!strutils.isNumber(expiretime)){
		ex = -1;
	}

	cache[key] = {
		"expire" : ex,
		"moddate" : new Date(),
		"content" : data
	}

	var dir = this.getPath()+"/"+key;

	if(dir.indexOf("/")>-1){
		dir = dir.slice(0,dir.lastIndexOf("/"));
	}

	if(self.getPath()==DEFAULT_PATH && firstime){
		fileutils.createpath(DEFAULT_PATH, function(path){
			firstime = false;
			self.setPath(path);
			fileutils.write(path+"/"+key,ex+"\r\n"+data,function(data){
				if(typeof(callback)=="function"){
					callback(data);
				}
			});
		});
	}else{
		fileutils.write(dir+"/"+key,ex+"\r\n"+data,function(data){
			if(typeof(callback)=="function"){
				callback(data);
			}
		});
	}
}

/**
 * Delete key from cache
 *
 * @param {String} key
 * @param {Function} callback [optional]
 */	
exports.remove = function(key, callback){
	delete cache[key];
	fileutils.exists(key, function(exists){
		if(exists){
			fileutils.remove(key, function(err){
				console.log(err)
				if(typeof(callback)=="function"){
					callback();
				}
			});
		}else{
			console.log("cache key '" + key + "' doesn't exists");
		}
	});
}