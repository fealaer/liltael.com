'use strict';

angular.module('mainApp')
    .directive('galleryViewer', [function () {
      return {
        restrict: 'A',
        transclude: true,
        scope: {
          gallery: '@'
        },
        templateUrl: 'views/main/galleryViewer.html'
      };
    }]);
