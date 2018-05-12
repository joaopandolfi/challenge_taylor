var eth_api = require("./util/eth_api.js")
var config = require("../model/config.js")
var responses = require("../model/responses.js")

function format_tax_response(resp){
	let formated = "";
	if(resp.success == 1){
		let tx = resp.data.pop()
		formated = responses.get_tx.replace("{block_heigth}",tx.blocknumber)
		formated = formated.replace("{timestamp}",tx.time)
		.replace("{from}",tx.from)
		.replace("{to}",tx.to)
		.replace("{value}",tx.value)
		.replace("{limit}",tx.limit)
		.replace("{txn}",tx.gasused)
		.replace("{price}",tx.gasprice)
		//.replace("{}",data.)
	}
	else formated = responses.errors.invalid_tx

	return formated
}

function format_wallet_reponse(resp){
	let formated = "";
	if(resp.success == 1){ 
		formated = responses.get_balance.replace("{price}",resp.data.balance)
	}
	else formated = responses.errors.invalid_wallet

	return formated
}

module.exports = {
	receive: (req,res) =>{
		//console.log(req.query)
		let message = req.query.message
		console.log(message)

		//Get tax
		if(message.search("/getTx") >= 0){
			let tx = message.split(" ");
			eth_api.consumeAPI(config.api.tx,tx.pop(), (result)=>{
				res.send(format_tax_response(result))
			})
		}
		//Get Wallet Balance
		else if(message.search("/getBalance") >= 0){
			let wallet = message.split(" ");
			eth_api.consumeAPI(config.api.wallet,wallet.pop(), (result)=>{
				res.send(format_wallet_reponse(result))
			})
		}

		//Random Message
		else res.send(responses.random[Math.floor(Math.random() * responses.random.length)]);
	}
}