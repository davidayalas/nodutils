var utils = require("./myapp-common-utils").utils;

utils.cache.PATH = "/apps/myapp/cache";

console.log(utils.cache.getPath());

var include2 = require("./myapp-module-2");