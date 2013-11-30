'use strict';

angular.module('startingPointJsApp')
    .controller('UsersCtrl', ['$scope', 'Users', 'Auth', function ($scope, Users, Auth) {
      $scope.users = [];
      $scope.user = Auth.getUser();
      Auth.subscribe($scope, function() {
        $scope.user = Auth.getUser();
      });
      Users.get().$promise.then(function (api) {
        if (api.status.code === 200) {
          $scope.users = api.result;
        }
      });
    }]);
