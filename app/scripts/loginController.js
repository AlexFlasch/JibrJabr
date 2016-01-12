var app = angular.module('jibrjabr');

app.controller('loginCtrl', ['loginUser', 'registerUser', '$state', function(loginUser, registerUser, $state) {
    var login = this;

    login.email = '';
    login.password = '';

    login.loginUser = function(username, password) {
        loginUser(username, password, function(data) {
            if(data.success) {
                $state.go('chat');
            }
        });

    };

    login.registerUser = function(username, password) {
        registerUser(username, password, function(data) {
            if(data.success) {
                $state.go('chat');
            }
        });
    };
}]);

app.service('loginUser', ['socket', function(socket) {
    return function(email, password, callback) {
        socket.emit('login', {
            email: email,
            password: password,
            sessionID: window.sessionID
        });

        socket.on('user:loggedin', callback);
    };
}]);

app.service('registerUser', ['socket', function(socket) {
    return function(email, password, callback) {
        socket.emit('register', {
            email: email,
            password: password,
            sessionID: window.sessionID
        });

        socket.on('user:registered', callback);
    };
}]);
