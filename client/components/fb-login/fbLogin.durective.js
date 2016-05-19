'use strict';

angular.module('meanApp')
  .directive('fbLogin', function() {
    return {
      templateUrl: 'components/fb-login/fb-login.html',
      restrict: 'E',
      controller: function($scope, ezfb) {
        updateLoginStatus(updateApiMe);

        $scope.login = function() {
          ezfb.login(function (res) {
            console.log('login: ', res);
            updateApiMe();
            if (res.authResponse) {
              updateLoginStatus(updateApiMe);
            }
          }, {scope: 'public_profile, email, user_friends'});
        };

        $scope.logout = function() {
          ezfb.logout(function (res) {
            updateLoginStatus(updateApiMe);
            console.debug('logout', res);
          });
        };

        $scope.share = function() {
          ezfb.ui(
            {
              method: 'feed',
              name: 'angular-easyfb API demo',
              picture: 'http://plnkr.co/img/plunker.png',
              link: 'https://69265933.ngrok.io',
              description: 'angular-easyfb is test.'
            },
            function (res) {
              // res: FB.ui response
              console.debug('FB.ui', res);
              // console.debug(ezfb.getAuthResponse());
            }
          );
        };

        var autoToJSON = ['loginStatus', 'apiMe'];
        angular.forEach(autoToJSON, function (varName) {
          $scope.$watch(varName, function (val) {
            $scope[varName + 'JSON'] = JSON.stringify(val, null, 2);
          }, true);
        });

        function updateLoginStatus (more) {
          ezfb.getLoginStatus(function (res) {
            $scope.loginStatus = res;
            console.debug('loginStatus', res);

            (more || angular.noop)();
          });
        }

        function updateApiMe () {
          ezfb.api('/me', function (res) {
            $scope.apiMe = res;
            console.debug('me: ', res);

          });
        }

        $scope.updateApiMe2 = function() {
          ezfb.api('/me?fields=email', function(res) {
            // $scope.apiMe = res;
            console.debug('mail: ', res);

          });
        }
      },
      controllerAs: 'fb'
    };
  });