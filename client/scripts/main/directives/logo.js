'use strict';

angular.module('mainApp')
    .directive('logo', [function () {
      return {
        restrict: 'A',
        transclude: true,
        controller: function ($scope) {
          $scope.imagePath = getImagePath($(window).width());

          $scope.getWidth = function() {
            return $(window).width();
          };

          $scope.$watch($scope.getWidth, function () {
            $scope.imagePath = getImagePath($(window).width());
          });

          window.onresize = function(){
            $scope.$apply();
          };

          function getImagePath(w) {
            var path;
            switch (true) {
              case (w <= 320):
                path = 'images/320/cat.png';
                break;
              case (w > 320 && w <= 768):
                path = 'images/768/cat.png';
                break;
              case (w > 768 && w <= 1024):
                path = 'images/1024/cat.png';
                break;
              case (w > 1024):
                path = 'images/1280/cat.png';
                break;
              default:
                path = 'images/1280/cat.png';
            }
            return path;
          }
        }
      };
    }]);

