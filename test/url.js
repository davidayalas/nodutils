var utils = require('../index.js');

module.exports = {
  get: function(test){
      utils.url.get("www.bbc.com",function(content,status,headers){
        test.expect(3);
        test.equals(typeof headers,"object");
        test.equals(status,200);
        test.equals(content.length>0,true);
        test.done();
      });
  },
  post: function(test){
      utils.url.post("http://httpbin.org/post",{post_data : {a:1,b:22,c:333}},function(content,status,headers){
        test.equals(typeof JSON.parse(content),"object");
        test.equals(status,200);
        test.equals(JSON.parse(content).data,"a=1&b=22&c=333");
        test.done();
      });
  }
}