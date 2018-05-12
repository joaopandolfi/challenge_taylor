

module.exports = {
	receive: (req,res) =>{
		let { message } = req.body

		//Get tax
		if(message.search("/getTx") >= 0){

		}
		//Get Wallet Balance
		else if(message.search("/getBalance") >= 0){

		}
		//Random Message
		else{

		}


		res.send("OK")
	}
}