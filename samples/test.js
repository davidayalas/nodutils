var utils = require("../index");

utils.url.get("https://script.google.com/a/macros/gencat.cat/s/AKfycbykqf6GhcO1FU4UKBKkhL5J09r5FQzpsLUJ2sNq2UBH2N4etyfr/exec?query=xarxa",function(result){
	console.log(JSON.stringify(result))
});
