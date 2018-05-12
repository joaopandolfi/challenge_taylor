var router = require('express').Router()
var busboy = require('connect-busboy');

var test = require("./test.js")
var message = require("./message.js")

router.post("/message",message.receive)

router.get("/test",test.all)

module.exports = router;