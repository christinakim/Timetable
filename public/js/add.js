var ref = new Firebase('https://blinding-torch-8945.firebaseio.com/goals');

$(document).ready(function() {
	$('.datepicker').pickadate({
		selectMonths: true, // Creates a dropdown to control month
		selectYears: 5 // Creates a dropdown of 15 years to control year
	});
	
	$('select').material_select();

	$('form').submit(function(event) {
		event.preventDefault();
		var authData = ref.getAuth();

		var deadline_date = moment(event.currentTarget.deadline_date.value).valueOf(),
			start_date = moment(event.currentTarget.starting_time.value).valueOf(),
			members = event.currentTarget.input_members.value.replace(/^\s*|\s*$/g,'').split(/\s*,\s*/);

		var input_time = $(event.currentTarget.input_time).val();
		for (var i=0; i < input_time.length; i++) {
			input_time[i] = parseInt(input_time[i], 10);
		}

		var goalObj = {
			goal: event.currentTarget.goal.value,
			deadline: deadline_date,
			time_needed: parseFloat(event.currentTarget.time_needed.value),
			num_chunks: parseFloat(event.currentTarget.num_chunks.value),
			start_date: start_date,
			input_members: members,
			input_length: parseFloat(event.currentTarget.input_duration.value),
			input_time: input_time,
			type: event.currentTarget.type.value,
			resources: event.currentTarget.resources.value,
			uid: authData.uid
		};

		if (validGoal(goalObj)) {
			console.log('pushing!');
			ref.push(goalObj);
		}
	});

	function validGoal(goal) {
		if (goal.start_date > goal.deadline) {
			// doesn't work :/
			//document.getElementById('starting_time').setCustomValidity('Start date must be earlier than deadline.');
		} else {
			return true;
		}
		return false;
	}
});
