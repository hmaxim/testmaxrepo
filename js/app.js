var mealDealApp = angular.module('mealDealApp', ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when('/',
            {
                templateUrl: 'views/vouchers.html',
                controller: 'buyVoucherCtrl'
            });
        $routeProvider.when('/restaurants',
            {
                templateUrl: 'views/restaurants.html',
                controller: 'restaurantsCtrl'
            });
        $routeProvider.when('/account',
            {
                templateUrl: 'views/personalAccount.html',
                controller: 'accountCtrl'
            });
        $routeProvider.when('/about',
            {
                templateUrl: 'views/about.html',
                controller: 'aboutCtrl'
            });
        $routeProvider.otherwise({redirectTo: '/'});
    });


