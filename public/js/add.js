var ref = new Firebase('https://blinding-torch-8945.firebaseio.com/goals');

$(document).ready(function() {
	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 15 // Creates a dropdown of 15 years to control year
	});

	$('form').submit(function(event) {
		event.preventDefault();

		var deadline_date = moment(event.currentTarget.deadline.value).valueOf(),
			start_date = moment(event.currentTarget.starting_time.value).valueOf(),
			members = event.currentTarget.input_members.value.replace(/^\s*|\s*$/g,'').split(/\s*,\s*/);

		// TODO: input time
		var goalObj = {
			goal: event.currentTarget.goal.value,
			deadline: deadline_date,
			time_needed: parseFloat(event.currentTarget.time_needed.value),
			num_chunks: parseFloat(event.currentTarget.num_chunks.value),
			start_date: start_date,
			input_members: members,
			input_length: parseFloat(event.currentTarget.input_duration.value),
			type: event.currentTarget.type.value,
			resources: event.currentTarget.resources.value,
			uid: 'google:109493626814112539176' // FIXME
		};

		if (validGoal(goalObj)) {
			console.log('pushing!');
			ref.push(goalObj);
		}
	});

	function validGoal(goal) {
		if (goal.start_date > goal.deadline) {
			// doesn't work :/
			document.getElementById('starting_time').setCustomValidity('Start date must be earlier than deadline.');
		} else {
			return true;
		}
		return false;
	}
});
