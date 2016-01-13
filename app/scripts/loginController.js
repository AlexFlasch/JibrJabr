var app = angular.module('jibrjabr');

app.controller('loginCtrl', ['loginUser', 'registerUser', '$state', function(loginUser, registerUser, $state) {
    var login = this;

    login.email = '';
    login.emailValid = true;
    login.password = '';
    login.passwordValid = true;

    login.loginUser = function(email, password, valid) {
        // if(valid) {
            loginUser(email, password, function(data) {
                if(data.success) {
                    $state.go('chat');
                }
            });
        // }
    };

    login.registerUser = function(email, password, valid) {
        // if(valid) {
            registerUser(email, password, function(data) {
                if(data.success) {
                    $state.go('chat');
                }
            });
        // }
    };
}]);

app.service('loginUser', ['socket', function(socket) {
    return function(email, password, callback) {
        socket.emit('user:login', {
            email: email,
            password: password,
            sessionID: window.sessionID
        });

        socket.on('user:loggedin', function(data) {
            callback(data);
        });
    };
}]);

app.service('registerUser', ['socket', function(socket) {
    return function(email, password, callback) {
        socket.emit('user:register', {
            email: email,
            password: password,
            sessionID: window.sessionID
        });

        socket.on('user:registered', function(data) {
            callback(data);
        });
    };
}]);
