var eth_api = require("./util/eth_api.js")
var config = require("../model/config.js")

module.exports = {

	all: function(req, res){
		aux = [];
		eth_api.consumeAPI(config.api.tx,config.test.tx, (result)=>{
			//console.log(result)
			aux.push(result)
			eth_api.consumeAPI(config.api.wallet,config.test.wallet, (result)=>{
				//console.log(result)
				aux.push(result)
				res.send(result)
			})	
		})
	}
}