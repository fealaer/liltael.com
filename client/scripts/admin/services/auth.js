'use strict';

angular.module('adminApp')
    .service('Auth', ['$rootScope', '$http', '$cookies', 'localStorageService', function Auth($rootScope, $http, $cookies) {
      this.eventName = 'Auth.changes';
      var user = {};
      Auth.prototype.isLoggedIn = function () {
        return $cookies.user ? true : false;
      };
      Auth.prototype.getUser = function () {
        return $cookies.user ? JSON.parse($cookies.user) : user;
      };
      Auth.prototype.signIn = function (data, callback) {
        $http.post('/signin', data).success(function (result) {
          if (result.status.code !== 200) {
            callback(result.error, null);
          } else {
            callback(null, result.result);
            waitForCookiesAndBroadcast();
          }
        });
      };
      Auth.prototype.signOut = function (callback) {
        $http.post('/signout').success(function (result) {
          if (result.status.code !== 200) {
            callback(result.error, null);
          } else {
            callback(null, result.result);
            delete $cookies.user;
            Auth.prototype.broadcast();
          }
        });
      };
      Auth.prototype.subscribe = function ($scope, callback) {
        $scope.$on(Auth.eventName, callback);
      };
      Auth.prototype.broadcast = function () {
        $rootScope.$broadcast(Auth.eventName);
      };
      function waitForCookiesAndBroadcast () {
        if ($cookies.user) {
          Auth.prototype.broadcast();
        } else {
          setTimeout(waitForCookiesAndBroadcast, 50);
        }
      }
    }]);
