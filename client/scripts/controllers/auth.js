'use strict';

angular.module('startingPointJsApp')
    .controller('AuthCtrl', ['$scope', '$modal', 'Auth', function ($scope, $modal, Auth) {
      $scope.user = Auth.getUser();
      Auth.subscribe($scope, function (){
        $scope.user = Auth.getUser();
      });
      $scope.signOutBtn = function () {
        Auth.signOut(function (err, res) {
          if (err) {
            $scope.error = err;
          }
        });
      };
      $scope.signInBtn = function () {
        $modal.open({
          templateUrl: 'views/authModal.html',
          controller: 'AuthModalCtrl'
        });
      };
    }]);
