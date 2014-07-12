
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
        .otherwise({
            redirectTo: '/home'
        });
})
