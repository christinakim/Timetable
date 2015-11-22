// set variables for environment
var express = require('express');
var app = express();
var path = require('path');
var http = require('http');
var Firebase = require('firebase');
var livereload = require('livereload');
var google = require('googleapis');

var ref = new Firebase("https://blinding-torch-8945.firebaseio.com/");

// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// instruct express to server up static assets
app.use(express.static('public'));

// set routes
app.get('/', function(req, res) {
		res.render('index');
});

app.get('/add', function(req, res) {
	res.render('add', {
		title: 'Add Goal'
	});
});

app.get('/calendar', function(req, res) {
	var authData = ref.getAuth();
	console.log(ref);
	if (authData) {
		listEvents(authData.google.accessToken);
	}else{
		console.log("User is logged out");
	}
	res.render('calendar', {
		title: 'View Calendar'
	});
});

function listEvents(auth) {d
  var calendar = google.calendar('v3');
  calendar.events.list({
    auth: auth,
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime'
  }, function(err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    var events = response.items;
    if (events.length == 0) {
      console.log('No upcoming events found.');
    } else {
      console.log('Upcoming 10 events:');
      for (var i = 0; i < events.length; i++) {
        var event = events[i];
        var start = event.start.dateTime || event.start.date;
        console.log('%s - %s', start, event.summary);
      }
    }
  });
}

// Set server port
app.listen(4000);
console.log('server is running');
