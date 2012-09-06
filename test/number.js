var utils = require('../index.js');

var num = 12.3456789;

module.exports = {
  round: function(test){
      test.expect(3)
      test.equals(num.round(),12);
      test.equals(num.round(2),12.35);
      test.equals(num.round(1),12.3);
      test.done();
  }      
}