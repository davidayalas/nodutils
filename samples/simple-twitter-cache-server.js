var utils = require("../index");
var twitterurl = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=";

utils.props.load(__dirname+"/simple-twitter-cache-server.props", function(props){
	var valids = props.valid_users.split(",");
	//server start
	require('http').createServer(function (req, res) {
		var p = require('url').parse(req.url,true).query;

		//only valid users can be served
		if(valids.contains(p.user)){
			utils.cache.get(p.user, function(content){
			    if(!content){
			        utils.url.get(twitterurl+p.user,function(result){
			            utils.cache.set(p.user,result,5);
				    	res.end((p.cb?p.cb+"(":"")+result+(p.cb?p.cb+")":""));
			        });
			    }else{
			    	res.end((p.cb?p.cb+"(":"")+content+(p.cb?p.cb+")":""));
			    }
			});
	  	}else{
		  res.end("Invalid user");
		}
	}).listen(8080);
})
