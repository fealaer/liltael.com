'use strict';

angular.module('sharedApp')
    .directive('galleryViewer', [function () {
      return {
        restrict: 'A',
        transclude: true,
        scope: {
          gallery: '@'
        },
        templateUrl: '/views/shared/galleryViewer.html'
      };
    }]);
