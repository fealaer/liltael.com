'use strict';

angular.module('sharedApp')
    .directive('videoPlayer', ['$sce', function ($sce) {
      return {
        restrict: 'A',
        transclude: true,
        scope: {
          video: '='
        },
        controller: function ($scope) {
          $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
          }
        },
        templateUrl: '/views/shared/videoPlayer.html'
      };
    }]);