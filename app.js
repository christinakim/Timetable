// set variables for environment
var fs = require('fs');
var readline = require('readline');
var express = require('express');
var app = express();
var path = require('path');
var Firebase = require('firebase');
var google = require('googleapis');
var bodyParser = require('body-parser');
var googleAuth = require('google-auth-library');



var ref = new Firebase("https://blinding-torch-8945.firebaseio.com/");

// views as directory for all template files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser());
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

app.post('/calendar', function(req,res){
	fs.readFile('client_secret.json', function processClientSecrets(err, content) {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      return;
    }
    // Authorize a client with the loaded credentials, then call the
    // Google Calendar API.
    authorize(JSON.parse(content), listEvents, req.body.accessToken);
  });
});


app.get('/calendar', function(req, res) {
	res.render('calendar', {
		title: 'View Calendar'
	});
});


function authorize(credentials, callback, token) {
  var clientSecret = credentials.web.client_secret;
  var clientId = credentials.web.client_id;
  var redirectUrl = credentials.web.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
  oauth2Client.setCredentials = token;
  console.log('token is' + token);
  console.log(oauth2Client.credentials);

  callback(oauth2Client);
}


function listEvents(auth) {
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
