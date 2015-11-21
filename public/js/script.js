$(document).ready(function() {
	$('#calendar').fullCalendar({
		handleWindowResize: true,
		defaultView: 'agendaWeek', // Only show week view
		displayEventTime: true, // Display event time
		header: {
	        left: 'prev,next today myCustomButton',
	        center: 'title',
	        right: 'month,agendaWeek,agendaDay'
	    }
    });
});