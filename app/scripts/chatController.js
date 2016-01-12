var app = angular.module('jibrjabr');

app.controller('chatCtrl', [function() {
    var chat = this;

    var msg = '';
}]);

app.service('sendMsg', ['socket', function(socket) {
    return function(msg) {
        socket.emit('msg:sent', {
            msg: msg,
            sessionID: window.sessionID
        });
    };
}]);

app.service('createRoom', ['socket', function(socket) {
    return function(roomName) {
        socket.emit('room:created', {
            roomName: roomName,
            sessionID: window.sessionID
        });
    };
}]);

app.service('joinRoom', ['socket', function(socket) {
    return function(roomName) {
        socket.emit('room:joined', {
            roomName: roomName,
            sessionID: window.sessionID
        });
    };
}]);

app.service('leaveRoom', ['socket', function(socket) {
    return function(roomName) {
        socket.emit('room:left', {
            roomName: roomName,
            sessionID: window.sessionID
        });
    };
}]);
