var utils = require("../index.js");

var twitterquery = "davidayalas";
var twitterkey = twitterquery.replace(":","_");
//var twitterurl = "http://search.twitter.com/search.json?q=";
var twitterurl = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name="


utils.cache.setPath("/apps/myapp/cache",function(){
	utils.cache.get(twitterkey, function(content){
		if(!content){
			utils.url.get(twitterurl+twitterkey,function(result){
				utils.cache.set(twitterkey,result,300);
				console.log("http get " + result.slice(0,200)+"[...]");
			});
		}else{
			console.log(content.slice(0,200)+"[...]");
		}
	});
});
