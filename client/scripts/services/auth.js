'use strict';

angular.module('startingPointJsApp')
    .service('Auth', ['$rootScope', '$http', 'localStorageService', function Auth($rootScope, $http, localStorageService) {
      this.eventName = 'Auth.changes';
      Auth.prototype.getUser = function () {
        return localStorageService.get('user');
      };
      Auth.prototype.signIn = function (data, callback) {
        $http.post('/signin', data).success(function (result) {
          if (result.status.code !== 200) {
            callback(result.error, null);
          } else {
            callback(null, result.result);
            localStorageService.set('user', result.result);
            Auth.prototype.broadcast();
          }
        });
      };
      Auth.prototype.signOut = function (callback) {
        $http.post('/signout').success(function (result) {
          if (result.status.code !== 200) {
            callback(result.error, null);
          } else {
            callback(null, result.result);
            localStorageService.clearAll();
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
    }]);
