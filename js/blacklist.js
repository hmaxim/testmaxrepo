<div ng-controller="authorizationCtrl">
    <fb:login-button scope="public_profile,email" onlogin="checkLoginState();">
    </fb:login-button>
    <div
class="fb-like"
data-share="true"
data-width="450"
data-show-faces="true">
    </div>
    </div>


var bestRest = angular.module('bestRestApp', ["ngRoute", "ui.router"]).config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('main', {
        url: "/",
        views: {
            '': {templateUrl: './views/main.html'},
            // the child views will be defined here (absolutely named)
            'currencyOptions@main': {
                templateUrl: './views/currencyOptions.html'
            },
            // another child view
            'vouchers@main': {
                templateUrl: '../views/vouchers.html'
            }
        }
    });

    $urlRouterProvider.otherwise("/");
});


<div class="col-lg-3 options">
    <ui-view name="currencyOptions"></ui-view>
    </div>
    <div class="col-lg-9 vouchers-field">
    <ui-view name="vouchers"></ui-view>
    </div>


$http.get('https://meal-deal.herokuapp.com/api/voucher/type/all',
    {headers: {'Content-Type': 'application/json; charset=UTF-8'},
        transformResponse:function(d,h){ return d}})
    .then(function successCallback(response) {
        // .then(function successCallback(data, status, headers) {
        //     console.log(response);
        // $scope.vouchersType = response.data;
        // //console.log($scope.vouchersType);
        //     getCountVouchers();
        console.log(response.data.split(" "));
    }, function errorCallback(response) {
        console.log(response);
    });

$scope.click = function () {
    for (var i = 0; i < $scope.vouchersType.length; i++) {
        console.log($scope.vouchersType[i].stringId);
        var voucherTypeId = $scope.vouchersType[i].stringId;
        var amout = $scope.orderArr[i];
        var voucherSet = {
            totalCost: $scope.totalCost,
            Order: {
                voucherTypeId : amout
            }
        };
        console.log(voucherSet);
    }


}
