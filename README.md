Utilities for NodeJS
====================

- [Installation](#installation)
- [Usage](#usage)
- Packages:
	+ [String](#string)
	+ [Number](#number)
	+ [Array](#array)
	+ [Date](#date)
	+ [File](#file)
	+ [Url](#url)
	+ [Cache ](#cache-)
	+ [Properties](#properties)
	+ [Geo](#geo)
- [Code samples](#samples)

Installation
-------------

				npm install nodutils

Usage
------

				var utils = require("nodutils");

String
-------

-	utils.string.**trim**(str) or String.**trim**()

-	utils.string.**ltrim**(str) or String.**trim**()

-	utils.string.**rtrim**(str) or String.**trim**()

-	utils.string.**toi**(str) or String.**toi**()

	+	Converts to integer<br />  

-	utils.string.**tof**(str[,decimals]) or String.**tof**([decimals])

	+	Converts to float, with number of decimals<br />  

-	utils.string.**dropDiacritics**(str) or String.**dropDiacritics**()

	+	Converts accents, diacritics into a plain letter<br />  

-	utils.string.**isNumber**(str) or String.**isNumber**()

-	utils.string.**stripHtml**(str) or String.**stripHtml**()

	+	Strip all html tags and leaves only text<br />  

-	utils.string.**count**(str,substr[,flags]) or String.**count**(substr[,flags]). 

	+	It counts the number of ocurrences of substr. Flags can be "i" (ignore case) and/or "d" (drop accents)<br />                                                                                  
-	utils.string.**reverse**(str) or String.**reverse**()

-	utils.string.**toHtml**(str) or String.**toHtml**() 

	+	Converts diacritics and almost all chars into html entities<br />  

-	utils.string.**fromHtml**(str) or String.**fromHtml**() 

	+	Converts into diacritics html encoded entities

Number
--------

-	utils.number.**round**(num[,decimals]) or Number.**round**([decimals])

	+	Rounds number to the given number of decimals

Array
------

- utils.array.**max**(array) or Array.**max**()

	+	Returns the max value in an array of numbers<br />  

- utils.array.**min**(array) or Array.**min**()

	+	Returns the min value in an array of numbers<br />  

- utils.array.**uniques**(array) or Array.**uniques**()

	+	Returns an array of uniques values in the original array<br />  

- utils.array.**aggregate**(array) or Array.**aggregate**()

	+	Returns an array of uniques values and counts its occurrences, sorted descending [(sample code)](#sample2)

				["a","b","c","d",1,2,"a","b","c","a","b","a",1,0,1].aggregate();

				returned array
				
				[ [ 'a', 4 ], [ '1', 3 ], [ 'b', 3 ], [ 'c', 2 ], [ '0', 1 ], [ '2', 1 ], [ 'd', 1 ] ]

- utils.array.**contains**(array,value[,flags]) or Array.**contains**(value[,flags])

	+	Returns true or false

	+	Flags can be "i" (ignore case) and/or "d" (drop accents)<br />
				

Date
-----

-	utils.date.**diff**(date1,date2[,unit]) 

	+	Unit = "d": days,"h": hours,"m": minutes,"s": seconds. Default unit is millis<br />  

-	utils.date.**millis**([date]) 

	+	Returns a timestamp in millis from current date or date passed as param (string or date object)<br />  

-	utils.date.**frommillis**(millis) 

	+	Returns a date object from millis passed as parameter


File
-----

-	utils.file.**write**(file,data[,options],function(err){}) 

	+	options = "w" write or "a" append<br />  

-	utils.file.**read**(file[,encoding],function(err,data){})
	
-	utils.file.**exists**(file,function(exists){}) 

	+ exists: true or false

-	utils.file.**getModTime**(file,function(date){})

	+	Date object is given to the callback as an argument<br />  

-	utils.file.**remove**(file,callback)

-	utils.file.**createpath**(path,callback)

Url
----
				//get sample
				utils.url.get("www.bbc.com",function(html){
					if(html){
						console.log(html);
					}
				});			

				//post sample
				utils.url.post('httpbin.org/post',{post_data:{data:'lorem ipsum dolor sit amet'}}, 
					function(resp){
						if(resp){
							console.log(resp);
						}
					}
				);
				
-	utils.url.**get**(url[,options],function(content,statuscode,headers){}) 

-	utils.url.**post**(url[,options],function(content,statuscode,headers){}) 

	+	Support for **http** and **https**
	+	Support for **proxy requests** (in url. E.g: "url"=http://www.proxy.com:8080/www.urltobeproxied.com)
	+	It is possible to set only url or options, but options need to set host, path, ...
	+	Options is an object with some props:

		*	"encoding" default is "utf-8"
		*	"post_data" (for post()) is an object 

			with the vars (post_data:{a:1,b:2})  

			or with the body in "data" key (post_data:{data:"whatever"})  

		*	"headers" (object)
		*	"auth" (string)
		*	"forceparse": if the url is with proxy data is better to set to true

Cache 
------

-	utils.cache.**getPath**()  

	+	Get the current cache dir (default is "./cache")<br />  

-	utils.cache.**setPath**(path,callback)

	+	Set the cache dir (and create if it doesn't exists)
	
	+	It's recommended to use absolute paths ("/apps/myapp/cache")<br />  

-	utils.cache.**setOptions**({path : "/mypath", size : 1}},callback)

	+	Set the cache dir (and create if it doesn't exists) and cache max size
	
	+	Cache size is in MB<br />  

-	utils.cache.**set**(key,data[,expiretime],callback) 

	+	Expiretime is in seconds. If not informed, then unlimited <br />  

-	utils.cache.**get**(key,function(value){})

-	utils.cache.**remove**(key,callback)

[(sample code)](#sample1)

Properties
-----------

- utils.props.**load**(path_to_file,function(props){})

	+ properties in the file are loaded into a JSON object passed in callback
	
	+ Format of the properties file is 

				key1=value1
				key2=value2
				key3=value3
				key4=123456789

- utils.props.**save**(path_to_file,properties,callback)
	
	+ properties param is a json object. You can save properties dynamically


Geo
----

Utilities for basic geocoding and checking distance between points. Limited to Google and Yahoo API limits, but you could geocode 50.000 addresses/points for Yahoo and 2.500 for Google. Utils.geo will use one or other depending of availability of the service. [(sample code)](#sample3)

- utils.geo.**getDistance**(point1,point2[,earthRadius])

	+ Calculates the distance between point1 and point2. Points are arrays: [latitude,longitude]

	+ Distance is in km.

	+ earthRadius default is 6371 km. <br />  

- utils.geo.**isInside**(point,center,radius[,earthRadius])
	
	+ Checks if a point (array of two positions [latitude,longitude]) is inside a circle (center + radius). Center is an array of two positions.

	+ radius is in KM

	+ earthRadius default is 6371 km. <br />  

- utils.geo.**geocode**(address,options,callback)

	+ Returns an array of two positions [latitude,longitude] for the given address. <br />  

- utils.geo.**rgeocode**(latitude,longitude,options,callback)

	+ Reverse geocode. Returns an object for the given latitude and longitude. <br />  

Both, geocode and rgeocode return the same object	

				{ 
					number : 'xxxxxxxxxxxx',
					street: 'xxxxxxxxxxxx',
					postal: 'xxxxxxxxxxxx',
					city: 'xxxxxxxxxxxx',
					county: 'xxxxxxxxxxxx',
					state: 'xxxxxxxxxxxx',
					country: 'xxxxxxxxxxxx',
					lat: 1.11,
					lon: 2.22 
				}

You can set the locale in the options object {"locale" : "en_GB"}

Samples
--------

-	<a id="sample1" name="sample1"> </a>Caching twitter request due to twitter api limits (it uses **url** and **cache** utilities)

				var utils = require("nodutils");
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


- <a id="sample2" name="sample2"> </a>Easy "tagcloud" from url content (it uses **url**, **string** and **array** utilities)

				var utils = require("nodutils");

				utils.url.get("www.bbc.com",function(content){
					var topwords = [];
					if(content){
						var topwords = content.stripHtml().split(" ").aggregate().filter(function(i){
							return i[0].length<=3 || i[0].indexOf("&")>-1?false:true;
						}).slice(0,50);
					}
					console.log(topwords);
				});  

- <a id="sample3" name="sample3"> </a>Calculate the distance between two unestructured addresses (it uses **geo**)

				var utils = require("nodutils");

				utils.geo.geocode("madrid,spain", function(p1){
					utils.geo.geocode("barcelona,spain", function(p2){
						console.log("distance between Madrid and Barcelona is: ");
						if(p1 && p2){
							console.log(utils.geo.getDistance([p1.lat, p1.lon],[p2.lat, p2.lon]) + " km");
						}
					});
				});

- Simple http server for [caching and serve only valid twitter users](https://github.com/davidayalas/nodutils/blob/master/samples/simple-twitter-cache-server.js) (stored in properties file)

- [Bulk geocode](https://github.com/davidayalas/nodutils/blob/master/samples/bulk-geocode.js) from url content. Tested with more than 5000 addresses. (it uses **geo**, **url**, **string**, **file**)

				var utils = require("nodutils");

				utils.url.get("http://w20.bcn.cat/opendata/DonaRecurs.aspx?arbre=general&recurs=TAULA_CARRERS&fitxer=1121",{"encoding":"iso-8859-1"}, function(content,code){
					if(content){
						content.split("\r\n").forEach(
							function(element, index, array){
								var add = element.slice(element.lastIndexOf(";")+1);
								if(add){	
									utils.geo.geocode((add.count("carrer","i")>0?add:"Carrer "+add)+",barcelona,spain", function(p){
										if(p && typeof(p)=="object" && p.lat && p.lon){
											console.log(element + ";" + p.lat + ";" + p.lon);
											utils.file.write(__dirname + "/geocoded-addresses.txt", element + ";" + p.lat + ";" + p.lon + "\r\n", "a");
										}
									});
								}
							}
						);
					}
				});

