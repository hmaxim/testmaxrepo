mealDealApp.controller('buyVoucherCtrl', function ($scope, $http) {
    $scope.vouchersType = [];
    $scope.orderArr = [];

    $http.get('https://meal-deal.herokuapp.com/api/voucher/type/all',
        {headers: {'Content-Type': 'application/json; charset=UTF-8'}})
        .then(function successCallback(response) {
            $scope.vouchersType = response.data;
            console.log($scope.vouchersType);
            getCountVouchers();
        }, function errorCallback(response) {
            console.log(response);
        });


    function getCountVouchers() {
        for (var i = 0; i < $scope.vouchersType.length; i++) {
            $scope.orderArr.push(0);
        }
    }

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

    $scope.click = function () {
        $scope.voucherSet = {};
        var Order = {};
        for (var i = 0; i < $scope.vouchersType.length; i++) {
            Order[$scope.vouchersType[i].stringId] = $scope.orderArr[i];
            $scope.voucherSet = {
                totalCost: $scope.totalCost,
                map: Order
            };

        }
        console.log(Order);
        console.log($scope.voucherSet);

        $http.post('https://meal-deal.herokuapp.com/api/voucher/set/create', $scope.voucherSet, {
            headers:{
            "Content-Type" : "application/json",
            "Authorization":  "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXhpbUBtYXhpbS5ydSIsImF1ZGllbmNlIjoid2ViIiwiY3JlYXRlZCI6MTUwNDE5NDM0NzUxMiwiZXhwIjoxNTM2MTk0MzQ3fQ.kEMc331NrGP9_rjE_74Bf5I6O8jtgZUz98IVNr1Zd-oNm13leAIwTRlS7dLMUNylLZYIKEW-5Uq7JruaIzACbw"
            }}).then(function successCallback(response) {
                console.log(response);
        }).then(function errorCallback(response) {
            console.log(response);
        });

    }

});