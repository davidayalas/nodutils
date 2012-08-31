var utils = require("../index.js");

console.log(["20","13","15","22","17"].max());
console.log(["20","13","15","22","17"].min());
console.log(["a","b","c","d","d","c","d","b",1,"a",1,104,105,104,"d"].uniques());
console.log(["a","d","b","c","d","d","c","d","b",1,"a",1,104,105,104,"d"].aggregate());

utils.url.get("www.gencat.cat",{'encoding':"iso-8859-1"},function(content){
	var topwords = content.stripHtml().split(" ").aggregate().filter(function(i){
		return i[0].length<=3 || i[0].indexOf("&")>-1?false:true;
	}).slice(0,50);
	console.log(topwords)
});  
