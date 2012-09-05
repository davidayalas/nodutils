var utils = require("../index.js");

      utils.geo.geocode("madrid,spain", function(p1){
            utils.geo.geocode("barcelona,spain", function(p2){
                console.log("distance between Madrid and Barcelona is: ");
                console.log(utils.geo.getDistance([p1.lat, p1.lon],[p2.lat, p2.lon]) + " km");
            });
        });