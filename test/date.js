var utils = require('../index.js');

var date1 = "1 Jan 2012";
var date2 = "30 Jun 2012";

module.exports = {
  diff: function(test){
      test.expect(5);
      test.equals(utils.date.diff(date1,date2),15634800000); //millis
      test.equals(utils.date.diff(date1,date2,"s"),15634800); //seconds
      test.equals(utils.date.diff(date1,date2,"m"),260580); //minutes
      test.equals(utils.date.diff(date1,date2,"h"),4343); //hours
      test.equals(utils.date.diff(date1,date2,"d"),180.95833333333334); //days
      test.done();
  },
  millis: function(test){
      test.equals(utils.date.millis(date1),1325372400000);
      test.done();
  },
  frommillis: function(test){
      test.equals(utils.date.millis(utils.date.frommillis(1325372400000)),utils.date.millis(date1));
      test.done();
  },
}