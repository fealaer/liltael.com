'use strict';

angular.module('startingPointJsApp')
    .controller('UsersCtrl', ['$scope', 'Users', function ($scope, Users) {
      $scope.users = [];
      Users.get().$promise.then(function (api) {
        if (api.status.code === 200) {
          $scope.users = api.result;
        }
      });
    }]);
