
angular.module('D3Example', ['ngRoute', 'controllers'])

.config(function ($routeProvider, $locationProvider) {
    // $locationProvider.html5Mode(true);
    $routeProvider
        .when('/home', {
            templateUrl: './views/about.html'
        })
        .when('/d3ex1', {
            templateUrl: './views/d3ex1.html',
            controller: 'd3ex1Ctrl'
        })
        .when('/d3ex2', {
            templateUrl: './views/d3ex2.html',
            controller: 'd3ex2Ctrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
})
