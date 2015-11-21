// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var Firebase = require('firebase');
var livereload = require('livereload');

// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// instruct express to server up static assets
app.use(express.static('public'));

var myFirebaseRef = new Firebase("https://blinding-torch-8945.firebaseio.com/");
myFirebaseRef.set({
	name: 'Nicole'
});

// set routes
app.get('/', function(req, res) {
	myFirebaseRef.child('name').on('value', function(snapshot) {
		res.render('index', {test: snapshot.val()});
	})
});

// Set server port
app.listen(4000);
console.log('server is running');