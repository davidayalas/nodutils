var utils = require("../index.js");

console.log(["20","13","15","22","17"].max());
console.log(["20","13","15","22","17"].min());
console.log(["a","b","c","d","d","c","d","b",1,"a",1,104,105,104,"d"].uniques());
console.log(["a","d","b","c","d","d","c","d","b",1,"a",1,104,105,104,"d"].aggregate());


console.log(["Á","d","b","c","d","d","c","d","b",1,"a",1,104,105,104,"d"].contains("à","id"));
