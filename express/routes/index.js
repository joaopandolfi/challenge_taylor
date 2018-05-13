/*
* Control all server routes
*/

var router = require('express').Router()
var busboy = require('connect-busboy');

//Importing controllers
var test = require("./test.js")
var message = require("./message.js")

//Setting routes
router.all("/message",message.receive)
router.get("/test",test.all)

module.exports = router;