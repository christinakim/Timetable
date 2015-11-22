var ref = new Firebase('https://blinding-torch-8945.firebaseio.com/goals');

$(document).ready(function() {
	ref.on("value", function(snapshot) {
	  console.log(snapshot.val());
	  var calendar_events = snapshot.val();
	  loadEvents(calendar_events);
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});

	function loadEvents(calendar_events) {
		var goals = [];
		for (var c in calendar_events) {
			console.log(calendar_events[c]);
			var start_date = moment.utc(calendar_events[c].start_date).format("YYYY-MM-DD hh:mm:ss");
			var end_date = moment.utc(calendar_events[c].deadline).format("YYYY-MM-DD hh:mm:ss");
			console.log(start_date);
			console.log(end_date);
			// actual goal
			var e = {
				title: calendar_events[c].goal,
				start: start_date,
				end: end_date
			}
			// input needed to accomplish goal

			goals.push(e);
		}
		$('#calendar').fullCalendar({
			handleWindowResize: true,
			events: goals,
			defaultView: 'agendaWeek', // Only show week view
			displayEventTime: true, // Display event time
			header: {
		        left: 'prev,next today myCustomButton',
		        center: 'title',
		        right: 'month,agendaWeek,agendaDay'
		    }
	    });
	}
});
