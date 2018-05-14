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

		https.get(callUrl, (res)=>{


				if(res.statusCode === 404)
					return callback({success:0,error:404,data:{}});

				res.setEncoding('utf8');

				res.on('data',  (chunk) =>{
					data += chunk;
				});

				res.on('end', (e)=>{
					result = {success:1,error:0,data:{}}
					console.log("DEBUG: "+data);

					parsed = JSON.parse(data);

					//Checking if has no result
					result.success = (Object.keys(parsed).length > 0 ) ? 1: 0;

					console.log(result)

					result.data = parsed
					callback(result);
			});
		}).on('error', (e) =>{
			console.log("Got error: " + e.message);
		});
	}
}
