var utils = require("../index.js");

//GET 

var http = "http://www.google.com";
var https = "https://www.google.com";
var httpproxied = "http://218.247.129.3/http://www.google.com"

utils.url.get(http,function(result){
	console.log("http get > " + result.slice(0,200)+"[...]\n\r");
});

utils.url.get(https,function(result){
	console.log("httpS get > " + result.slice(0,200)+"[...]\n\r");
});

utils.url.get(httpproxied,function(result){
	console.log("httpProxied get > " + result.slice(0,200)+"[...]\n\r");
});

//POST
var httppost = "http://httpbin.org/post"
var httpSpost = "https://httpbin.org/post"

utils.url.post(httppost,{post_data : {a:1,b:22,c:333}},function(result){
	console.log("http post  > " + result + "\n\r");
	utils.url.post(httpSpost,{post_data : {a:1,b:22,c:333}},function(result){
		console.log("httpS post  > " + result + "\n\r");
	});
});


