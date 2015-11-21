$(document).ready(function() {
    console.log("IM HERE");
    $("#loginButton").on('click',function() {
        console.log("Login Button Clicked");
        ref.authWithOAuthPopup("google", function(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
        } else {
            console.log("Authenticated successfully with payload:", authData);
        }
     });
    });
});