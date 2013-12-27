'use strict';

angular.module('liltaelApp')
    .directive('galleryViewer', [function () {
      return {
        restrict: 'A',
        transclude: true,
        scope: {
          gallery: '@'
        },
        templateUrl: 'views/galleryViewer.html'
      };
    }]);
