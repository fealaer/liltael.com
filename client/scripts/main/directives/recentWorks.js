'use strict';

angular.module('mainApp')
    .directive('recentWorks', ['Recent', function (Recent) {
      return {
        restrict: 'A',
        transclude: true,
        controller: function ($scope) {
          Recent.get({recent: 'works'}).$promise.then(function (api) {
            if (api.status.code === 200) {
              $scope.works = api.result;
            }
          });
        },
        templateUrl: 'views/main/recentWorks.html'
      };
    }]);
