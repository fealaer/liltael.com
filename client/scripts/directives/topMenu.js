'use strict';

angular.module('liltaelApp')
    .directive('topMenu', ['$location', 'Menu', function ($location, Menu) {
      return {
        restrict: 'A',
        transclude: true,
        controller: function ($scope) {
          var menuItems = $scope.menuItems = Menu.get();

          $scope.select = function (path) {
            angular.forEach(menuItems, function (menuItem) {
              menuItem.selected = menuItem.link === path;
              angular.forEach(menuItem.nestedMenu, function (nestedMenuItem) {
                nestedMenuItem.selected = false;
                if (nestedMenuItem.link === path) {
                  nestedMenuItem.selected = menuItem.selected = true;
                }
              });
            });
          };

          $scope.select($location.path());
        },
        templateUrl: 'views/topMenu.html'
      };
    }]);
