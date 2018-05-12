/*
* Call Eth blockchain api
*/

var https = require("https");
const config = require("../../model/config.js");

module.exports = { consumeAPI:(service,value,callback)=>{
		var https = require("https");
		var data = "";

		callUrl = config.api.base_url+service+value;
		
		callUrl = encodeURI(callUrl);

		console.log(callUrl);

		https.get(callUrl, function(res) {
	  		
	  		console.log("Got response: " + res.statusCode);
	  		
	  		if(res.statusCode == 404)
	  			callback({success:0,error:404,data:{}});

	   		res.setEncoding('utf8');

	  		res.on('data', function (chunk) {
		   		data += chunk;
	  		});

		  	res.on('end', function(e){

		  		console.log("DEBUG: "+data);

				parsed = JSON.parse(data);
				callback({success:1,error:0,data:parsed});
			});
		}).on('error', function(e) {
			console.log("Got error: " + e.message);
		});
	}
}