mealDealApp.controller('buyVoucherCtrl', function ($scope, $http, $q, usSpinnerService) {
    $scope.vouchersType = [];
    $scope.orderArr = [];


    function getUser() {
        $scope.user = JSON.parse(localStorage.getItem('userInfo'));
        $scope.userId = $scope.user.user.id;
        $scope.accessToken = $scope.user.accessToken;
    }

    function getCountVouchers() {
        for (var i = 0; i < $scope.vouchersType.length; i++) {
            $scope.orderArr.push(0);
        }
    }

    getUser();
    usSpinnerService.spin('spinner');

    $http.get('https://meal-deal.herokuapp.com/api/voucher/type/all',
        {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
        .then(function successCallback(response) {
            $scope.vouchersType = response.data;
            console.log($scope.vouchersType);
            getCountVouchers();
            usSpinnerService.stop('spinner');
        }, function errorCallback(response) {
            console.log(response);
        });

    $scope.addOrderCount = function (index) {
        $scope.orderArr[index] = $scope.orderArr[index] + 1;
    };

    $scope.removeOrderCount = function (index) {
        if ($scope.orderArr[index] <= 0) {
            return;
        }
        $scope.orderArr[index] = $scope.orderArr[index] - 1;
    };

    $scope.totalCountVouchers = function () {
        return $scope.orderArr.reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
        }, 0);
    };

    $scope.totalSumVouchers = function () {
        $scope.totalSumArr = [];
        for (var i = 0; i < $scope.vouchersType.length; i++) {
            $scope.totalSumArr.push($scope.orderArr[i] * $scope.vouchersType[i].cost);
        }
        return $scope.totalCost = $scope.totalSumArr.reduce(function (p1, p2) {
            return p1 + p2;
        }, 0)
    };


    var payPalObj = {
        id: '',
        createTime: "",
        resourceType: "",
        eventType: "",
        summary: "",
        eventVersion: "",
        resource: {
            id: "",
            parentPayment: "",
            updateTime: "",
            clearingTim: "",
            state: "",
            paymentMode: "",
            createTime: "",
            protectionEligibilityType: "",
            protectionEligibility: "",
            amount: {
                total: 0,
                currency: ""
            },
            invoiceNumber: "",
            custom: ""
        }
    };


    $scope.click = function () {
        var voucherSet = {};
        var Order = {};
        for (var i = 0; i < $scope.vouchersType.length; i++) {
            Order[$scope.vouchersType[i].id] = $scope.orderArr[i];
            voucherSet = {
                totalCost: $scope.totalCost,
                map: Order
            };

        }

        var defer = $q.defer();

        defer.promise.then(function () {
            $http.post('https://meal-deal.herokuapp.com/api/voucher/set/create', voucherSet, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": $scope.accessToken
                }
            }).then(function successCallback(response) {
                payPalObj.id = response.data.id;
                payPalObj.resource.amount.total = $scope.totalCost * 100;
                payPalObj.custom = $scope.userId;
            }, function errorCallback(response) {
                console.log(response);
            });
            return payPalObj;
        }).then(function () {
            $http.post('https://meal-deal.herokuapp.com/api/sale/completed', payPalObj, {
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(response) {
                console.log(response);
            });

        });
        defer.resolve();

    }

});