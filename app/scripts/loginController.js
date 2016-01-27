var app = angular.module('jibrjabr');

app.controller('loginCtrl', ['loginUser', 'registerUser', '$state', function(loginUser, registerUser, $state) {
    var login = this;

    login.email = '';
    login.emailValid = true;
    login.password = '';
    login.passwordValid = true;

    login.loginUser = function(email, password, valid) {
        var userRef = new Firebase(firebaseUrl);

        userRef.authWithPassword({
            email: data.email,
            password: data.password
        }, function(err, authData) {
            if(err) {
                // TODO login failed, perform some sort of validation
            }
            else {
                window.uid =
                $state.go('chat');
            }
        });
    };

    login.registerUser = function(email, password, valid) {
        db.createUser({
            email: data.email,
            password: data.password
        }, function(err, user) {
            if(err) console.log(err);

            var success = user !== undefined;

            if(io.sockets.connected[data.sessionID]) {
                console.log('emitting registered to ' + data.sessionID);
                io.sockets.connected[data.sessionID].emit('user:registered', {
                    success: success
                });
            }
        });
    };
}]);
