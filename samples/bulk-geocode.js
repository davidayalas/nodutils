var utils = require("../index");

utils.url.get("http://w20.bcn.cat/opendata/DonaRecurs.aspx?arbre=general&recurs=TAULA_CARRERS&fitxer=1121",{"encoding":"iso-8859-1"}, function(content,code){
	if(content){
		content.split("\r\n").forEach(
			function(element, index, array){
				var add = element.slice(element.lastIndexOf(";")+1);
				if(add){	
					utils.geo.geocode((add.count("carrer","i")>0?add:"Carrer "+add)+",barcelona,spain", function(p){
						if(p && typeof(p)=="object" && p.lat && p.lon){
							console.log(element + ";" + p.lat + ";" + p.lon);
							utils.file.write(__dirname + "/geocoded-addresses.txt", element + ";" + p.lat + ";" + p.lon + "\r\n", "a");
						}
					});
				}
			}
		);
	}
});