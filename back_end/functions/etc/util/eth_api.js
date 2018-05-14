/*
* Call Eth blockchain api
*/

var https = require("https");
//const config = require("./etc/model/config.js");

module.exports = { consumeAPI:(config,service,value,callback)=>{
		var https = require("https");
		var data = "";

		callUrl = config.api.base_url+service+value;

		callUrl = encodeURI(callUrl);

		console.log(callUrl);

		https.get(callUrl, (res) =>{

	  		console.log("Got response: " + res.statusCode);

	  		if(res.statusCode === 404)
	  			return callback({success:0,error:404,data:{}});

	   		res.setEncoding('utf8');

	  		res.on('data',  (chunk) =>{
		   		data += chunk;
	  		});

		  	res.on('end', (e)=>{

		  		console.log("DEBUG: "+data);

				parsed = JSON.parse(data);
				return callback({success:1,error:0,data:parsed});
			});
			return 0 ;
		}).on('error', (e) =>{
			console.log("Got error: " + e.message);
		});
	}
}
