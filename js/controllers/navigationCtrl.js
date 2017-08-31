mealDealApp.controller('navigationCtrl', function ($scope, $location) {
    $scope.linkVouchers = function () {
        $location.path("/");
    };
    $scope.linkRestaurants = function () {
        $location.path('/restaurants');
    };
    $scope.linkAccount = function () {
        $location.path('/account');
    };
    $scope.linkAbout = function () {
        $location.path('/about');
    };

});