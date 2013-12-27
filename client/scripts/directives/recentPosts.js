'use strict';

angular.module('liltaelApp')
    .directive('recentPosts', ['Recent', function (Recent) {
      return {
        restrict: 'A',
        transclude: true,
        controller: function ($scope) {
          Recent.get({recent: 'posts'}).$promise.then(function (api) {
            if (api.status.code === 200) {
              $scope.posts = api.result;
            }
          });
        },
        templateUrl: 'views/recentPosts.html'
      };
    }]);
