var ref = new Firebase('https://blinding-torch-8945.firebaseio.com/goals');

$(document).ready(function() {
	ref.on("value", function(snapshot) {
	  console.log(snapshot.val());
	  var calendar_events = snapshot.val();
	  loadEvents(calendar_events);
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});

	function loadEvents(cal) {
		var goals = [];
		for (var c in cal) {
			var start_date = moment(cal[c].start_date).utc().utcOffset('-0600').format("YYYY-MM-DD HH:mm");
			var end_date = moment(cal[c].deadline).utc().utcOffset('-0600').format("YYYY-MM-DD HH:mm");

			// actual goal
			var e = {
				title: cal[c].goal,
				start: start_date,
				end: end_date
			}

			// calculate offsets for scheduling input
			var duration = moment(end_date).diff(moment(start_date));
			var input_time = cal[c].input_time;

			if (typeof input_time !== 'undefined') {
				$.each(input_time, function(i, val) {
					input_time = val / 100;
					var input_start = moment(moment(start_date) + (duration * input_time)).toDate();
					var input_end = moment(input_start).add(cal[c].input_length, 'h').toDate();
					var input_event = {
						title: cal[c].goal + ' input',
						start: input_start,
						end: input_end
					}
					goals.push(input_event);
				});
			}
			goals.push(e);
		}

		$('#calendar').fullCalendar({
			handleWindowResize: true,
			events: goals,
			defaultView: 'month', // Only show week view
			displayEventTime: true, // Display event time
			header: {
		        left: 'prev,next today myCustomButton',
		        center: 'title',
		        right: 'month,agendaWeek,agendaDay'
		    }
	    });
	}
});
