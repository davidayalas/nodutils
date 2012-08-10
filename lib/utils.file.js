var globalutils = require("./utils.global.js");

function getCommonCallback(){
	return function(err, data){
		if(err!=null){
			console.log(err);
		}else if(data){
			console.log(data);
		}
	};
}

/*
* Write content to file
*
* @param {String} file
* @param {String} data
* @param {String} options > "w" write or "a" appending [optional]
* @param {String} callback [optional]
*/
exports.write = function(file,data,options,callback){
	var fs = require("fs");

	if(typeof(options)=="function"){
		callback=options;
		options = "w";
	}

	if(!globalutils.isValid(callback)){
		callback = getCommonCallback();
	}

	if(!globalutils.isValid(options)){
			options="w";
	}

	var dir = file;
	if(dir.indexOf("/")>-1){
		dir = dir.slice(0,dir.lastIndexOf("/"));
	}

	switch(options){
		case "a":
			this.createpath(dir, function(){
				fs.open(file,options,666,function(e,fd){
				  fs.write(fd,data,0,data.length,function(err, written, buffer){
					fs.close(fd, function(){	
						callback();
					});
				  });
				});
			});
			break;

		default:
			this.createpath(dir, function(){
				fs.writeFile(file,data,callback);
			});
	}
}

/*
* Read file content
*
* @param {String} file
* @param {String} encoding [optional]
* @param {String} callback [optional]
*/
exports.read = function(file,encoding,callback){
	if(typeof(encoding)=="function"){
		callback = encoding;
		encoding = "utf-8";		
	}else{
		if(typeof(encoding)=="undefined"){
			encoding="utf-8";
		}

	}

	if(!globalutils.isValid(callback)){
		callback = getCommonCallback();
	}

	this.exists(file, function(exists){
		if(exists){
			require("fs").readFile(file,encoding,function(err, data){
				callback(data);
			});
		}else{
			callback(null);
		}
	});
}

/*
* Check if file exists
*
* @param {String} file
* @param {String} callback [optional]
*/
exports.exists = function(file,callback){exists(file,callback);}
var exists = function(file,callback){
	require("fs").stat(file,function(err,stats){
		if(err==null){
			callback(true);
		}else{
			callback(false);
		}
	});
}

/*
* Get modification date
*
* @param {String} file
* @param {String} callback [optional]
*	@callback param {Date Object} 
*/
exports.getModTime = function(file,callback){
	require("fs").stat(file,function(err,stats){
		var r=null;
		if(err==null){
			var r = stats.mtime;
		}

		if(typeof(callback)=="function"){
			callback(r);
		}else{
			getCommonCallback(null,r);
		}
	});
}

/*
* Remove file
*
* @param {String} file
* @param {String} callback [optional]
*/
exports.remove = function(file,callback){
	require("fs").unlink(file,function(err){
		if(typeof(callback)=="function"){
			callback(err);
		}
	});
}

/*
* Create path
*
* @param {String} path
* @param {String} callback [optional]
*/
exports.createpath = function(path,callback){
	var self=this;
	self.exists(path,function(exists){
		if(!exists){
			var abspath = self.getAbsolutePath(path);
			abspath = abspath.split("/");
			createdir(abspath,"",callback)
		}else{
			if(typeof(callback)=="function"){
				callback();
			}
		}
	});
}

/*
* Get absolute path from strpath
*
* @param {String} strpath
* @param {String} callback [optional]
*/
exports.getAbsolutePath = function(strpath, callback){
	var p=require("path");
	p=p.resolve(__dirname,p.normalize(strpath)).replace(/\\/g,"/");
	return p;
}

/*
* Create dirs recursively from directory array, testing if the path exists or not.
*
* @param {String} path
* @param {String} callback [optional]
*/
var createdir = function(arrdirs,path,callback){
	if(arrdirs && arrdirs.length>0){
		exists(path+arrdirs[0], function(ex){
			if(!ex && !(arrdirs[0].indexOf(":")>-1)){
				require("fs").mkdir(path+arrdirs[0],function(err){
					console.log(err)
					path = path + arrdirs.splice(0,1) + "/";
					createdir(arrdirs,path,callback);
				});
			}else{
				path = path + arrdirs.splice(0,1) + "/";
				createdir(arrdirs,path,callback);
			}
		});
	}else{
		if(typeof(callback)=="function"){
			callback(path);
		}
	}
}