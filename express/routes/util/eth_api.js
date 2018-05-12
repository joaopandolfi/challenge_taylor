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

		https.get(callUrl, (res)=>{
	  		
	  		//console.log("Got response: " + res.statusCode);
	  		
	  		if(res.statusCode === 404)
	  			return callback({success:0,error:404,data:{}});

	   		res.setEncoding('utf8');

	  		res.on('data',  (chunk) =>{
		   		data += chunk;
	  		});

		  	res.on('end', (e)=>{
		  		result = {success:1,error:0,data:{}}
		  		//console.log("DEBUG: "+data);

		  		if(data == "{}")
		  			result.success = 0;
				parsed = JSON.parse(data);
				result.data = parsed
				callback(result);
			});
		}).on('error', (e) =>{
			console.log("Got error: " + e.message);
		});
	}
}