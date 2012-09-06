var utils = require('../index.js');

var content = "Lorem ipsum dolor sit amet";

module.exports = {
  write: function(test){
      utils.file.write(__dirname + "/tmp/test.txt", content, function(err){
        test.ok(!err);
        test.done();
      });
  },
  append: function(test){
      utils.file.write(__dirname + "/tmp/test.txt", "\r\n"+content, "a", function(err){
        test.ok(!err);
        test.done();
      });
  },
  read: function(test){
      utils.file.read(__dirname + "/tmp/test.txt", function(err,data){
        test.ok(!err);
        test.equals(content+"\r\n"+content, data);
        test.done();
      });
  },
  exists: function(test){
      utils.file.exists(__dirname + "/tmp/test.txt", function(e1){
        utils.file.exists(__dirname + "/tmp/test2.txt", function(e2){
          test.ok(e1);
          test.ok(!e2);
          test.done();
        });
      });
  },
  modtime: function(test){
      utils.file.getModTime(__dirname + "/tmp/test.txt", function(d){
        test.equals((utils.date.millis()-utils.date.millis(d))<3000,true);
        test.done()
      });
  },
  remove: function(test){
      utils.file.remove(__dirname + "/tmp/test.txt", function(){
        utils.file.exists(__dirname + "/tmp/test.txt", function(e){
            test.ok(!e);
            test.done();
        });
      });
  }
}