var utils = require("../index.js");

console.log("-----------------------------------------------------------------\r\n STRING\r\n-----------------------------------------------------------------");

var str = "    abcABCxyzàáéèÍÏÓÒÑçaaaz    ";
console.log("string '" + str + "'");
console.log("\r\r>> is '" + utils.string.trim(str) + "' with utils.string.trim('" + str + "')");
console.log("\r\r>> is '" + utils.string.ltrim(str) + "' with utils.string.ltrim('" + str + "')");
console.log("\r\r>> is '" + utils.string.rtrim(str) + "' with utils.string.rtrim('" + str + "')");
console.log("\r\r>> is '" + utils.string.dropDiacritics(str) + "' with utils.string.dropDiacritics('" + str + "')");

console.log("\r\r>> contains string 'a' " + utils.string.count(str,"a") + " times with utils.string.count('"+str+"','a')");
console.log("\r\r>> contains string 'a' " + utils.string.count(str,"a","i") + " times with utils.string.count('"+str+"','a','i')");
console.log("\r\r>> contains string 'a' " + utils.string.count(str,"a","id") + " times with utils.string.count('"+str+"','a','id')");
console.log("\r\r>> contains string 'a' " + utils.string.count(str,"xxxx","id") + " times with utils.string.count('"+str+"','xxxx','id')");

console.log("\r\r>> is '" + utils.string.reverse(str) + "' with utils.string.reverse('"+str+"')");

console.log("\r\r>> is '" + utils.string.toHtml(str) + "' with utils.string.toHtml('"+str+"')");
console.log("\r\r>> and is '" + utils.string.toHtml(str).fromHtml() + "' with utils.string.fromHtml('"+str.toHtml()+"')");

str = '<!doctype html><html lang="en"><head>    <meta charset="utf-8" />    <title>Title of This Web Page</title>    <meta name="description" content="Description of the content of this web page." /></head><body><p>My first web page.</p></body></html>';
console.log("\r\rhtml '" + str + "'");
console.log("\r\r>>is \"" + utils.string.stripHtml(str) + "\" with utils.string.stripHtml()");

console.log("\r\r\r\n-----------------------------------------------------------------\r\n NUMBER \r\n-----------------------------------------------------------------");

str = "    1234.5678    "
console.log("string number '" + str + "'");

console.log("\r\r>> is '" + utils.number.stoi(str) + "' with utils.number.stoi('" + str + "')");
console.log("\r\r>> is '" + utils.number.stof(str,2)+ "' with utils.number.stof('" + str + "',2)");

str = 123.45678
console.log("\r\r\r\nnumber " + str);
console.log("\r\r>> is '" + utils.number.round(str,3) + "' with utils.number.round('" + str + "',3)");
console.log("\r\r>> is '" + utils.number.round(str,2) + "' with utils.number.round('" + str + "',2)");
console.log("\r\r>> is '" + utils.number.round(str) + "' with utils.number.round('" + str + "')");

console.log("\r\n-----------------------------------------------------------------\r\n ARRAY \r\n-----------------------------------------------------------------");

var testarray = ['20','13','15','22','17'];
console.log("\r\r>>Array "+JSON.stringify(testarray)+" max is " + testarray.max() + " with " + JSON.stringify(testarray) + ".max()" );
console.log("\r\r>>Array "+JSON.stringify(testarray)+" min is " + testarray.min() + " with " + JSON.stringify(testarray) + ".min()" );
testarray = ["a","b","c","d","d","c","d","b",1,"a",1,104,105,104,"d"];
console.log("\r\r>>Array "+JSON.stringify(testarray)+" uniques values are " + JSON.stringify(testarray.uniques()) + " with " + JSON.stringify(testarray) + ".uniques()" );
console.log("\r\r>>Array "+JSON.stringify(testarray)+" aggregated values are " + JSON.stringify(testarray.aggregate()) + " with " + JSON.stringify(testarray) + ".aggregate()" );

console.log("\r\n-----------------------------------------------------------------\r\n DATE\r\n-----------------------------------------------------------------");
 
var date1 = new Date("1 jan 2012");
var date2 = new Date();

console.log("date1 is " + date1);
console.log("\r\rdate2 is " + date2);


console.log("\r\rDifference between dates is");
console.log("\r\r>> " + utils.date.diff(date1,date2,"d") + " days with utils.date.diff(date1,date2,'d')");
console.log("\r\r>> " + utils.date.diff(date1,date2,"h") + " hours with utils.date.diff(date1,date2,'h')");
console.log("\r\r>> " + utils.date.diff(date1,date2,"m") + " minutes with utils.date.diff(date1,date2,'m')");
console.log("\r\r>> " + utils.date.diff(date1,date2,"s") + " seconds with utils.date.diff(date1,date2,'s')");
console.log("\r\r>> " + utils.date.diff(date1,date2) + " millis with utils.date.diff(date1,date2)");

console.log("\r\rCurrent millis (timestamp) is " + utils.date.millis() + " with utils.date.millis()");
var sdate = '25 Jun 2011';
console.log("\r\rMillis (timestamp) for '"+sdate+"' is " + utils.date.millis(sdate) + " with utils.date.millis('"+sdate+"')");
console.log("\r\rDate from millis '" + utils.date.millis(sdate) + "' is '"+ utils.date.frommillis(utils.date.millis(sdate)) + "'  with utils.date.frommillis('" + utils.date.millis(sdate) + "')");

console.log("\r\r\r\n-----------------------------------------------------------------\r\n URL\r\n-----------------------------------------------------------------");

console.log("\r\rwith utils.url.get('http://es.eurosport.yahoo.com/',function(data){...}) you can get the http/s response");
utils.url.get('http://es.eurosport.yahoo.com/',function(data){
	console.log("\r\rresponse from url.get is " + data.slice(0,200) + "[...]");
});
console.log("\r\rwith utils.url.post('http://httpbin.org/post',{post_data: {data:'lorem ipsum dolor sit amet'}}, function(data){console.log(data)}); you can post data to a http/s server");
utils.url.post('http://httpbin.org/post',{post_data: {data:'lorem ipsum dolor sit amet'}}, function(data){
	console.log("\r\rresponse from url.post is " + data);
});

console.log("\r\r\r\n-----------------------------------------------------------------\r\n FILE (callback response could be at the end of console output)\r\n-----------------------------------------------------------------");

var file = "./temp/testing.txt";
var content = "lorem ipsum a lot";

console.log("var file='./temp/testing.txt';var content = 'lorem ipsum a lot';");

console.log("\r\rwith utils.file.write(file,content,function(){console.log('write done');})");
utils.file.write(file,content,function(){
	console.log('\r\rwrite done');
	//read inside callback to test properly
	utils.file.read(file,function(data){console.log('read done:' + data);})
})
console.log("\r\rwith utils.file.read(file,content,function(content){console.log('read done:' + content);})");
console.log("\r\rwith utils.file.exits(file) check if a file exists");
utils.file.exists(file,function(exists){if(exists)console.log(file + " exists!!")})
console.log("\r\rwith utils.file.getModTime() you can get the modification time of a file");
utils.file.getModTime(file,function(date){console.log(file + " last modification time is " + date)})
console.log("\r\rwith utils.file.createpath(path) you can create a structure of directories");

console.log("\r\n-----------------------------------------------------------------\r\n CACHE (callback response could be at the end of console output)\r\n-----------------------------------------------------------------");

var key='test';
var content = "testing a lot";
var expire = 60;

console.log("var key='test', content='testing a lot', expire = 60");
console.log("\r\rwith utils.cache.set(key,content,expire)");
utils.cache.set(key,content,expire)
console.log("\r\rwith utils.cache.get(key)");
utils.cache.get(key,function(value){
	console.log("\r\rvalue in cache is: " + value)	
});
utils.cache.remove("test");

console.log("\r\n-----------------------------------------------------------------\r\n PROPERTIES (callback response could be at the end of console output)\r\n-----------------------------------------------------------------");

utils.props.load(__dirname+"/sample-properties.txt", function(props){
	console.log("\r\rProperties loaded: " + JSON.stringify(props));
})


