$(document).ready(function() {
	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 15 // Creates a dropdown of 15 years to control year
	});

	$('#calendar').fullCalendar({
		header: {
	        left: 'prev,next today myCustomButton',
	        center: 'title',
	        right: 'month,agendaWeek,agendaDay'
	    },
        events: [
        {
            title  : 'event1',
            start  : '2010-01-01'
        },
        {
            title  : 'event2',
            start  : '2010-01-05',
            end    : '2010-01-07'
        },
        {
            title  : 'event3',
            start  : '2010-01-09T12:30:00',
            allDay : false // will make the time show
        }
    ]
    });
});