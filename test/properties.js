var utils = require("../index.js");

utils.props.load(__dirname+"/sample-properties.txt", function(props){
	props["news-property-"+utils.date.millis()] = "testing new property";
	
	console.log(props["property1"])

	utils.props.save(__dirname+"/sample-properties.txt", props);
})

