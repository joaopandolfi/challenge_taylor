var eth_api = require("./util/eth_api.js")
var config = require("./model/config.js")
var https = require("https");
var http = require("http");

module.exports = {

	url:(req,res) =>{
		callUrl = encodeURI("http://restfull.hol.es/");
		http.get(callUrl,(result)=>{
			res.send(result)
		});
	},

	all: function(req, res){
		aux = [];
		eth_api.consumeAPI(config, config.api.tx, config.test.tx, (result)=>{
			//console.log(result)
			//aux.push(result)
			res.send(result);
			/*eth_api.consumeAPI(config.api.base_url+config.api.wallet+config.test.wallet, (result)=>{
				//console.log(result)
				aux.push(result)
				res.send(result)
			})
			*/
		})
	}
}
