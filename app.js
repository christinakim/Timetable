// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var Firebase = require('firebase');
var livereload = require('livereload');

// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// instruct express to server up static assets
app.use(express.static('public'));


// set routes
app.get('/', function(req, res) {
		res.render('index')

	
});

app.get('/add', function(req, res) {
	res.render('add', {
		title: 'Add Goal'
	});
});

app.get('/calendar', function(req, res) {
	res.render('calendar', {
		title: 'View Calendar'
	});
});


// Set server port
app.listen(4000);
console.log('server is running');