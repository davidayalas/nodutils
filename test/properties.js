var utils = require('../index.js');

utils.file.resolvePath("");

var properties;

module.exports = {
    load : function(test){
        utils.props.load("../samples/simple-twitter-cache-server.props" , function(props){
            properties = props;
            test.equals(typeof props, "object");
            test.ok(props.valid_users);
            test.done();
        })
    },
    save : function(test){
        properties["test-prop"] = "testing property";
        utils.props.save("../samples/simple-twitter-cache-server.props", properties, function(){
          utils.props.load("../samples/simple-twitter-cache-server.props", function(props){
            test.equals(typeof props, "object");
            test.ok(props["test-prop"]);
            test.done();
          });
        });
    }
}