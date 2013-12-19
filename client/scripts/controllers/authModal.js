'use strict';

angular.module('startingPointJsApp')
    .controller('AuthModalCtrl', ['$scope', '$modalInstance', 'Auth', function ($scope, $modalInstance, Auth) {
      var defaultError = {error: false};
      $scope.error = defaultError;
      $scope.data = {};
      $scope.signIn = function (data) {
        Auth.signIn(data, function (err, res) {
          if (err) {
            $scope.error = {error: true, message: err.message};
          } else {
            $modalInstance.close(res);
          }
        });
      };
      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };
      $scope.$watch('data', function() {
        $scope.error = defaultError;
      }, true);
    }]);
