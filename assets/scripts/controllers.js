
angular.module('controllers', ['D3ex1Controller', 'D3ex2Controller'])

.controller('menuCtrl', function ($scope) {
    $scope.home = 'active item';
    $scope.d3ex1 = 'item';
    $scope.d3ex2 = 'item';

    $scope.changeClass = function (item) {
        $scope.home = 'item';
        $scope.d3ex1 = 'item';
        $scope.d3ex2 = 'item';

        $scope[item] = 'active item';
    }
})
