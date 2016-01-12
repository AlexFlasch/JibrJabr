var app = angular.module('jibrjabr', ['ui.bootstrap', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'login-partial.html'
        })
        .state('chat', {
            url: '/chat',
            templateUrl: 'chat-partial.html'
        });

});

app.controller('mainCtrl', [function($ui, $router) {
    var main = this;

    main.test = "Hello, World!";
}]);

app.factory('socket', function ($rootScope) {
    var socket = io.connect('http://localhost:3000/');

    socket.on('conn:success', function(data) {
        window.sessionID = data;
    });

    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
            var args = arguments;
            $rootScope.$apply(function () {
                callback.apply(socket, args);
            });
        });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
          var args = arguments;
                $rootScope.$apply(function () {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
});

app.service('remote', [function() {
    return require('electron').remote;
}]);
