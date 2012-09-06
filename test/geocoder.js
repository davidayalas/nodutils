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
  }
}