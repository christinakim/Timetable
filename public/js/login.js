var ref = new Firebase("https://blinding-torch-8945.firebaseio.com/");

$(document).ready(function() {
    $("#loginButton").on('click',function() {
        console.log("Login Button Clicked");
        ref.authWithOAuthPopup("google", function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:", authData);
                var isNewUser = true;
                ref.onAuth(function(authData) {
                  if (authData && isNewUser) {
                    // save the user's profile into the database so we can list users,
                    // use them in Security and Firebase Rules, and show profiles
                    ref.child("users").child(authData.uid).set({
                      uid: authData.google.displayName,
                      proPic: authData.google.profileImageURL,
                      token: authData.google.accessToken
                    });
                    $.post( "/calendar", {uid: authData.uid, accessToken: authData.google.accessToken});
                }
            });
        }
        }, {
            remember: "sessionOnly",
            scope: "https://www.googleapis.com/auth/calendar"
        });
    });

});
