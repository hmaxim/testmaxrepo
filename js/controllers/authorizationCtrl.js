//'maxim@maxim.ru'
//'12345678'

mealDealApp.controller('authorizationCtrl', function ($scope, $http) {
    function statusChangeCallback(response) {
        console.log('statusChangeCallback');
        console.log(response);

        if (response.status === 'connected') {
            testAPI();
        } else {
            // The person is not logged into your app or we are unable to tell.
            document.getElementById('status').innerHTML = 'Please log ' +
                'into this app.';
        }
    }

    // This function is called when someone finishes with the Login
    // Button.  See the onlogin handler attached to it in the sample
    // code below.
    function checkLoginState() {
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });
    }

    window.fbAsyncInit = function() {
        FB.init({
            appId      : '708115976046881',
            cookie     : true,  // enable cookies to allow the server to access
                                // the session
            xfbml      : true,  // parse social plugins on this page
            version    : 'v2.8' // use graph api version 2.8
        });

        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });

    };

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));


    function testAPI() {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', function(response) {
            console.log('Successful login for: ' + response.name);
            document.getElementById('status').innerHTML =
                'Thanks for logging in, ' + response.name + '!';
        });
    }

    $scope.basicRegister = function () {
        $http({
            method: 'POST',
            url: 'https://meal-deal.herokuapp.com/api/customer/registration ',
            contentType: "application/json; charset=utf-8",
            data: {
                email: $scope.email,
                password: $scope.password
            }
        }).then(function successCallback(response) {
            console.log(response);
        },function errorCallback(response) {
            console.log(response);
        });
    };

    $scope.basicAuth = function () {
        $http({
            method: 'POST',
            url: 'https://meal-deal.herokuapp.com/api/auth ',
            contentType: "application/json; charset=utf-8",
            data: {
                email: $scope.email,
                password: $scope.password
            }
        }).then(function successCallback(response) {
            console.log(response);
        },function errorCallback(response) {
            console.log(response);
        });
    };
});