angular.module('myApp', [])
    .controller('myController', function($scope) {
        $scope.selected = function(dt) {
            console.log(dt);
        };
        $scope.config = {
            monthSelection: true,
            yearSelection: true,
            navigation: true
        };
        $scope.date = (new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + new Date().getFullYear();
    });
