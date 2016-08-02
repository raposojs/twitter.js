var express = require('express');
var morgan = require('morgan');
var swig = require('swig');
var bodyParser = require('body-parser');
var app = express(); // creates an instance of an express application
var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
var path = require('path');
var tweetBank = require('./tweetBank');

swig.setDefaults({ cache: false })

app.set('views', __dirname + '/views'); // point res.render to the proper directory

app.set('view engine', 'html'); // have res.render work with html files

app.engine('html', swig.renderFile); // when giving html files to res.render, tell it to use swig

app.use(function(req, res, next){
	console.log(req.method + " " + req.path + " " + res.statusCode)
	// console.log(req.params.name)
	next()	
}) // use always needs a next in the end

app.use(express.static('public')) // enables the request to access all files in the public directory

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/', function (req, res) {
  var tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets, showForm: true } ); // renders index. second part is based on swig
});

app.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  res.render( 'index', { tweets: list } );
});

app.get('/tweets/:count', function(req, res){
	var count = req.params.count;
	var numCount = +count;
	var tweet = tweetBank.find({count: numCount});
	res.render('index', {tweets: tweet});
});

app.post('/tweets', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  tweetBank.add(name, text);
  res.redirect('/');
});

app.listen(3000, function(){
	console.log("Example app lol")
}) // listen should be in the end