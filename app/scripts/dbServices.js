var remote;
var User;

var app = angular.module('jibrjabr');

app.run(function() {
    remote = require('electron').remote;
    User = remote.User;
});

app.service('registerUser', function(username, password) {
    var user = new User({
        username: username,
        password: password,
        displayName: username
    });

    user.save();
});

app.service('loginUser', function(username, password) {
    var user = new User({
        username: username,
        password: password
    });

    user.checkPassword(user.password, function(err, success, user) {
        if(success) {
            sessionStorage.setItem('currentUser', user);
        }
    });
});

app.service('changeDisplayName', function(displayName) {
    if(sessionStorage.getItem('currentUser') !== undefined) {
        var user = new User({
            displayName: displayName
        });

        user.update();
    }
});
