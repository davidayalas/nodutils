var globalutils = require("./utils.global");
var fileutils = require("./utils.file");
var strutils = require("./utils.string");
var dateutils = require("./utils.date");

var self = this;
var cache = [];
var cacheSize = 0;

var PATH = DEFAULT_PATH ="./cache";
var MAX_CACHE_SIZE = DEFAULT_MAX_CACHE_SIZE = -1; //no limit

var firstime = true; 
var isPathNormalized = false;

/**
 * Get the cache path
 *
 * @return {String} path
 */	
exports.getPath = function(){
	if(!isPathNormalized){
		self.PATH = fileutils.getAbsolutePath(self.PATH);
		isPathNormalized=true;
	}
	return self.PATH;
}

/**
 * Set the cache path
 *
 * @param {String} path
 * @param {Function} callback
 */	
exports.setPath = function(path, callback){
	if(globalutils.isValid(path)){
		self.PATH=fileutils.getAbsolutePath(path);
		isPathNormalized=true;
		fileutils.createpath(path,callback);
	}else{
		console.log("invalid path");
	}
}

/**
 * Set the global options for cache
 *
 * @param {Object} config
 * 		@key {String} path
 * 		@key {Number} size //in MB
 * @param {Function} callback
 */	
exports.setOptions = function(config, callback){
	if(globalutils.isValid(config)){
		if(globalutils.isValid(config.size) && strutils.isNumber(config.size)){
			MAX_CACHE_SIZE = config.size*1024;
		}
		if(globalutils.isValid(config.path)){
			self.setPath(config.path,callback);
		}else{
			if(typeof(callback)=="function"){
				callback();
			}
		}
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
 * Validate cache size and deletes first items
 *
 * @param {String} key
 * @param {Number} size
 * @param {Number} lsize //last size for existing keys
 */	
function validateCacheSize(key,size,lsize){
	if(MAX_CACHE_SIZE>-1){
		cacheSize -= lsize;
		if((cacheSize+size)>MAX_CACHE_SIZE){ //if current cache size is greater than MAX with current item, we delete enough items from cache arr start
			var s;
			for(var k in cache){
				s = cache[k].size;
				self.remove(k);
				cacheSize -= s;
				if((cacheSize+size)<=MAX_CACHE_SIZE){ //we have space now
					break;
				}
			}	
		}
		cacheSize+=size;
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
	if(typeof(expiretime)=="function"){
		callback = expiretime;		
	}

	var ex=expiretime;
	if(!strutils.isNumber(expiretime)){
		ex = -1;
	}

	if(data){
		data = data.toString();
	}else{
		data = "";
	}

	var exist = false;
	var lsize = 0;

	if(cache[key]){
		lsize = cache[key].size;
	}

	cache[key] = {
		"expire" : ex,
		"moddate" : new Date(),
		"content" : data,
		"size" : Buffer.byteLength(data,'utf8')
	}

	validateCacheSize(key,cache[key].size,lsize);

	var dir = self.getPath()+"/"+key;

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

//test purposes only
exports.show = function(){
	console.log(cache);
	console.log(cacheSize);
}