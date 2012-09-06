var utils = require('../index.js');

var str = "    abcABCxyzàáéèÍÏÓÒÑçaaaz    ";
var strnum = " 2.3456789";
var strhtml = '<!doctype html><html lang="en"><head>    <meta charset="utf-8" />    <title>Title of This Web Page</title>    <meta name="description" content="Description of the content of this web page." /></head><body><p>My first web page.</p></body></html>';

module.exports = {
  trim: function(test){
      test.equals(str.trim(),"abcABCxyzàáéèÍÏÓÒÑçaaaz");
      test.done();
  },
  ltrim: function(test){
      test.equals(str.ltrim(),"abcABCxyzàáéèÍÏÓÒÑçaaaz    ");
      test.done();
  },
  rtrim: function(test){
      test.equals(str.rtrim(),"    abcABCxyzàáéèÍÏÓÒÑçaaaz");
      test.done();
  },
  toi: function(test){
      test.equals(strnum.toi(),2);
      test.done();
  },
  tof: function(test){
      test.expect(2);
      test.equals(strnum.tof(),2.3456789);
      test.equals(strnum.tof(3),2.346);
      test.done();
  },
  isNumber: function(test){
      test.expect(2);
      test.equals(strnum.isNumber(),true);
      test.equals(str.isNumber(),false);
      test.done();
  },
  stripHtml: function(test){
      test.equals(strhtml.stripHtml().trim(),"Title of This Web Page My first web page.");
      test.done();
  },
  count: function(test){
      test.expect(3);
      test.equals(str.count("a"),4);
      test.equals(str.count("a","i"),5);
      test.equals(str.count("a","id"),7);
      test.done();
  },
  reverse: function(test){
      test.equals(str.reverse(),"    zaaaçÑÒÓÏÍèéáàzyxCBAcba    ");
      test.done();
  },
  toHtml: function(test){
      test.equals(str.toHtml(),"    abcABCxyzà&aacute;&eacute;&egrave;&Iacute;&Iuml;&Oacute;&Ograve;&Ntilde;&ccedil;aaaz    ");
      test.done();
  },      
  fromHtml: function(test){
      test.equals("abcABCxyzà&aacute;&eacute;&egrave;&Iacute;&Iuml;&Oacute;&Ograve;&Ntilde;&ccedil;aaaz".fromHtml(),"abcABCxyzàáéèÍÏÓÒÑçaaaz");
      test.done();
  }      
}