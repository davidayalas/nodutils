var utils = require('../index.js');

var num = [10,12,24,70,2,15,20,70];
var arr = ["a","b","c","d",1,10,12,"a","b",21,0,"a"];

module.exports = {
  max: function(test){
      test.equals(num.max(),70);
      test.done();
  },      
  min: function(test){
      test.equals(num.min(),2);
      test.done();
  },
  uniques: function(test){
      test.equals(JSON.stringify(arr.uniques()),JSON.stringify([0,1,10,12,21,"a","b","c","d"]));
      test.done();
  },
  aggregate: function(test){
      test.equals(JSON.stringify(arr.aggregate()),JSON.stringify([["a",3],["b",2],["0",1],["1",1],["10",1],["12",1],["21",1],["c",1],["d",1]]));
      test.done();
  },
  contains: function(test){
  	  test.expect(5);
      test.equals(arr.contains("a"),true);
      test.equals(arr.contains("A"),false);
      test.equals(arr.contains("A","i"),true);
      test.equals(arr.contains("À","id"),true);
      test.equals(arr.contains("À","d"),false);
      test.done();
  }
}