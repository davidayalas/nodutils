Utilities for NodeJS
====================

var utils = require("./node-utils");

String
-------

-	utils.string.**trim**(str) or String.**trim**()

-	utils.string.**ltrim**(str) or String.**trim**()

-	utils.string.**rtrim**(str) or String.**trim**()

-	utils.string.**dropAccents**(str) or String.**dropAccents**()

-	utils.string.**isNumber**(str) or String.**isNumber**()

-	utils.string.**stripHtml**(str) or String.**stripHtml**()

-	utils.string.**count**(str,substr,flags) or String.**count**(substr,flags). 

	+	It counts the number of ocurrences of substr. Flags can be "i" (ignore case) and/or "d" (drop accents)
	

-	utils.string.**reverse**(str) or String.**reverse**()

-	utils.string.**toHtml**(str) or String.**toHtml**() 

	+	Converts diacritics and almost all chars into html entities


-	utils.string.**fromHtml**(str) or String.**fromHtml**() 

	+	Converts into diacritics html encoded entities


Numeric
--------

-	utils.number.**stoi**(str) or String.**stoi**()

	+	Converts to integer


-	utils.number.**stof**(str,decimals) or String.**stof**(decimals)

	+	Converts to float, with number of decimals


-	utils.number.**round**(num,decimals) or Number.**round**(decimals)

	+	Rounds number to the given number of decimals

Date
-----

-	utils.date.**diff**(date1,date2,unit) 

	+	Unit = "d": days,"h": hours,"m": minutes,"s": seconds. Default unit is millis

File
-----

-	utils.file.**write**(file,data,options,callback) 

	+	options = "w" write or "a" append


-	utils.file.**read**(file,encoding,callback) 

	+	encoding is optional


-	utils.file.**exists**(file,callback) 

-	utils.file.**getModTime**(file,callback)

	+	Date object is given to the callback as an argument


-	utils.file.**remove**(file,callback)

-	utils.file.**createpath**(path, callback)

URL
----

-	utils.url.**get**(url, options, callback) 

-	utils.url.**post**(url, options, callback) 

	*	Support for **http** and **https**. 
	*	Support for **proxy requests** (in url. E.g: "url"=http://www.proxy.com:8080/www.urltobeproxied.com)
	*	It is possible to set only url or options, but options need to set host, path, ...
	*	Options is an object with some props:

		+	"encoding" default is "utf-8"
		+	"post_data" (for post()) is an object 

			with the vars (post_data:{a:1,b:2})

			or with the body in "data" key (post_data:{data:"whatever"}).

		+	"headers" (object)
		+	"auth" (string)
		+	"forceparse": if the url is with proxy data is better to set to true

Cache
------

-	utils.cache.**getPath**() 

	+	Get the current cache dir (default is "./cache")


-	utils.cache.**setPath**(path,callback)

	+	Set the cache dir (and create if it doesn't exists)
	
	+	It's recommended to use absolute paths ("/apps/myapp/cache")


-	utils.cache.**setOptions**({path : "/mypath", size : 1}}, callback)

	+	Set the cache dir (and create if it doesn't exists) and cache max size 
	
	+	Cache size is in MB


-	utils.cache.**set**(key, data, expiretime, callback) 

	+	Expiretime is in seconds. It is optional.


-	utils.cache.**get**(key, callback)

-	utils.cache.**remove**(key, callback)


SAMPLES
--------

-	Caching twitter request due to twitter api limits 

		var utils = require("./node-utils");
		var twitterquery = "davidayalas";
		var twitterurl = "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=";

		utils.cache.get(twitterquery, function(content){
			if(!content){
				utils.url.get(twitterurl+twitterquery,function(result){
					utils.cache.set(twitterquery,result,300);
					console.log(result);
				});
			}else{
				console.log(content);
			}
		});
