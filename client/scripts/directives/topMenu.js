'use strict';

angular.module('liltaelApp')
    .directive('topMenu', ['$location', 'Menu', function ($location, Menu) {
      return {
        restrict: 'A',
        transclude: true,
        controller: function ($scope) {
          var menuItems = $scope.menuItems = Menu.get();

          angular.forEach(menuItems, function (menuItem) {
            if (menuItem.link === $location.path()) menuItem.selected = true;
          });

          $scope.select = function (menuItem) {
            angular.forEach(menuItems, function (menuItem) {
              menuItem.selected = false;
            });
            menuItem.selected = true;
          };
        },
        templateUrl: 'views/topMenu.html'
      };
    }]);
