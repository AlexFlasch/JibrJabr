var app = angular.module('jibrjabr', ['ui.bootstrap', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('index', {
            url: '/login',
            templateUrl: 'login-partial.html'
        });

});

app.controller('mainCtrl', [function($ui, $router) {
    var main = this;

    main.test = "Hello, World!";
}]);
