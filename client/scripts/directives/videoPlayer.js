'use strict';

angular.module('liltaelApp')
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
        templateUrl: 'views/videoPlayer.html'
      };
    }]);