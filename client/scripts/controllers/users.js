'use strict';

angular.module('startingPointJsApp')
    .controller('UsersCtrl', ['$scope', 'User', function ($scope, User) {
      $scope.users = [];
      User.get().$promise.then(function (api) {
        if (api.status.code === 200) {
          $scope.users = api.result;
        }
      });
    }]);
