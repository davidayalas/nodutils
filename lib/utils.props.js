var globalutils = require("./utils.global.js");
var fileutils = require("./utils.file.js");

/*
* Load properties file
*
* @param {String} file
* @param {String} callback [optional]
*/
exports.load = function(file,callback){
	fileutils.read(file, function(content){
		if(content){
			content = content.split("\r\n");
			var p = {};
			for(var i=0,z=content.length;i<z;i++){
				//if(content[i] && (content[i].indexOf("#")==-1 || content[i].indexOf("#")>0) && content[i].indexOf("=")>-1){
				if(content[i]){
					p[content[i].slice(0,content[i].indexOf("="))] = content[i].slice(content[i].indexOf("=")+1);	
				}					
			}
		}
		if(typeof(callback)=="function"){
			callback(p);
		}
	});
}

/*
* Save properties file
*
* @param {String} file
* @param {String} callback [optional]
*/
exports.save = function(file,p,callback){
	var stb = [];
	for(var k in p){
		stb.push(k,"=",p[k],"\r\n");
	}
	fileutils.write(file,stb.join(""),function(){
		if(typeof(callback)=="function"){
			callback(p);
		}
	});
}