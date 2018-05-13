/*
*  REST chatbot server
* 
* Created by: João Carlos Pandolfi Santana
* Email: joaopandolfi@gmail.com
*/

var express = require('express');
var https = require('https');
var http = require('http');
var helmet = require('helmet');
var morgan = require("morgan");
var bodyParser = require('body-parser');

const config = require("./model/config.js");
var router = require("./routes");

var app = express();

//==== CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// SECURITY
app.use(helmet());

// LOGS
app.use(morgan("common"));

// ROUTES
app.use('/', router);


//=== Initializing Server
app.listen(config.http_port, function () {
	console.log("Listening at :%s", config.http_port);
});