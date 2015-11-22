var ref = new Firebase("https://blinding-torch-8945.firebaseio.com/");
$("#logoutButton").on('click',function() {
	ref.unauth();
}