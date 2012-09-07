var utils = require('../index.js');

module.exports = {
  geocode : function(test){
    utils.geo.geocode("madrid,spain", {"locale":"en_GB"}, function(p1){
        utils.geo.geocode("barcelona,spain", {"locale":"en_GB"}, function(p2){
          var d = utils.geo.getDistance([p1.lat, p1.lon],[p2.lat, p2.lon])
          test.equals(d>500 && d<510, true);
          test.done();
        });
    });
  },
  revgeocode : function(test){
    utils.geo.rgeocode(41.2,2.31,{"locale":"en_GB"},function(p1){
    	test.equals(typeof(p1),"object");
    	test.equals(p1.state,"Catalonia");
    	test.done();
    });
  }
}