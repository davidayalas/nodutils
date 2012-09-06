var utils = require('../index.js');

var path = __dirname+"/cache";

module.exports = {
  setOptions: function(test){
      utils.cache.setOptions({"path":path,"size":0.025},function(){
        test.equals(utils.cache.getPath(),path);
        test.done();
      });
  },
  setget: function(test){
      utils.cache.set("a","1111111111",function(){
        utils.cache.set("b","2222222222",function(){
          utils.cache.set("c","3",function(){
            utils.cache.get("a",function(v1){
              utils.cache.get("b",function(v2){
                utils.cache.remove("c",function(){
                  utils.cache.get("c",function(v3){
                    test.equals(v1,"1111111111");
                    test.equals(v2,"2222222222");
                    test.equals(v3,null);
                    test.done();
                  });
                });
              });
            });
          });
        });
      });
  },
  size: function(test){
      var c = utils.cache.show().size;
      utils.cache.set("c","3333333",function(){
        var c2 = utils.cache.show().size;
        test.equals(c,20);
        test.equals(c2,17);
        test.done();
      });
  },  

}