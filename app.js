var express = require('express');
var morgan = require('morgan')
var app = express(); // creates an instance of an express application


app.use(function(req, res, next){
	console.log(req.method + " " + req.path + " " + res.statusCode)
	next()	
})

app.use('/special',function(req, res, next){
	console.log("My friend, welcome to the special area!")
	next()
})

app.get('/', function(req,res){
	res.send("BRUNOOO")
})

app.get('/special', function(req,res){
	res.send("WHATS UUUPPPP - YOU SPECIAL")
})

app.listen(3000, function(){
	console.log("Example app lol")
})