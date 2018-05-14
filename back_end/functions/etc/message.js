var eth_api = require("./util/eth_api.js");
var time = require("./util/time.js");
var config = require("./model/config.js");
var responses = require("./model/responses.js");

/*
* @param eth (ethereum value) {float}
* @return string (formated string eth)
*/
function format_eth_gwei(eth){
	return (eth < 1)? eth.toFixed(9)+" Ether ("+eth*1000000000+" Gwei)":eth+" Ether"
}

/*
* @param resp (data reiceived from server) {success: 1 or 0, error: (int), data: {}}
* @return formated (text formated data) {string}
*/
function format_tax_response(resp){
	let formated = "";
	if(resp.success === 1){
		let tx = resp.data.pop()
		formated = responses.get_tx.replace("{block_heigth}",tx.blocknumber)
		formated = formated.replace("{timestamp}",tx.time)
		.replace("{calc_timestamp}",time.pasted_time(tx.time))
		.replace("{from}",tx.from)
		.replace("{to}",tx.to)
		.replace("{value}",tx.value)
		.replace("{limit}",tx.gas)
		.replace("{txn}",tx.gasused)
		.replace("{price}",format_eth_gwei(tx.gasprice))
		//.replace("{}",data.)
	}
	else formated = responses.errors.invalid_tx

	return formated
}

/*
* @param resp (data reiceived from server) {success: 1 or 0, error: (int), data: {}}
* @return formated (text formated data) {string}
*/
function format_wallet_reponse(resp){
	let formated = "";
	if(resp.success === 1){
		formated = responses.get_balance.replace("{price}",format_eth_gwei(resp.data.balance))
	}
	else formated = responses.errors.invalid_wallet

	return formated
}

module.exports = {
	receive:(message,callback) =>{
				//Get tax
				if(message.search("/getTx") === 0){
					let tx = message.slice(7); //splitting command
					eth_api.consumeAPI(config,config.api.tx,tx, (result)=>{
						callback(format_tax_response(result));
					})
				}
				//Get Wallet Balance
				else if(message.search("/getBalance") === 0){
					let wallet = message.slice(12);//message.split(" ");
					eth_api.consumeAPI(config,config.api.wallet,wallet, (result)=>{
						callback(format_wallet_reponse(result))
					})
				}

				//Random Message
				else return callback(responses.random[Math.floor(Math.random() * responses.random.length)]);
			}
	}
