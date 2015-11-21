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

var ref= new Firebase("https://blinding-torch-8945.firebaseio.com/");
ref.set({
	name: 'Nicole'
});

// set routes
app.get('/', function(req, res) {
	ref.child('name').on('value', function(snapshot) {
		res.render('index', {test: snapshot.val()});
	})

	ref.authWithOAuthPopup("google", function(error, authData) {
  		if (error) {
    		console.log("Login Failed!", error);
  		} else {
    		console.log("Authenticated successfully with payload:", authData);
  		}
	});
});

// Set server port
app.listen(4000);
console.log('server is running');