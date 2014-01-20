'use strict';

angular.module('adminApp')
    .controller('AuthCtrl', ['$scope', '$location', 'Auth', function ($scope, $location, Auth) {
      if (Auth.isLoggedIn()) $location.path('/');
      var defaultError = {error: false};
      $scope.error = defaultError;
      $scope.data = {};

      $scope.$watch('data', function () {
        $scope.error = defaultError;
      }, true);

      Auth.subscribe($scope, function () {
        if (Auth.isLoggedIn()) {
          $location.path('/');
        } else {
          $location.path('/signIn');
        }
      });

      $scope.signInBtn = function (data) {
        Auth.signIn(data, function (err, res) {
          if (err) {
            $scope.error = {error: true, message: err.message};
          }
        });
      };
    }]);
