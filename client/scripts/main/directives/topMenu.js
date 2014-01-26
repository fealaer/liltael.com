'use strict';

angular.module('mainApp')
    .directive('topMenu', ['$location', 'Menu', function ($location, Menu) {
      return {
        restrict: 'A',
        transclude: true,
        controller: function ($scope) {
          $scope.menuItems = [];
          Menu.get(function(err, result) {
            if (err) {
              // TODO add error handler
            } else {
              $scope.menuItems = result;
              $scope.select($location.path());
            }
          });

          $scope.select = function (path) {
            angular.forEach($scope.menuItems, function (menuItem) {
              menuItem.selected = menuItem.path === path;
              angular.forEach(menuItem.nestedMenu, function (nestedMenuItem) {
                nestedMenuItem.selected = false;
                if (nestedMenuItem.path === path) {
                  nestedMenuItem.selected = menuItem.selected = true;
                }
              });
            });
          };
        },
        templateUrl: '/views/main/topMenu.html'
      };
    }]);
