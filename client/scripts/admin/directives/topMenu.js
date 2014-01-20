'use strict';

angular.module('adminApp')
    .directive('topMenu', ['$location', 'Menu', 'Auth', function ($location, Menu, Auth) {
      return {
        restrict: 'A',
        transclude: true,
        controller: function ($scope) {
          $scope.user = Auth.getUser();

          Auth.subscribe($scope, function () {
            $scope.user = Auth.getUser();
          });

          $scope.signOutBtn = function () {
            Auth.signOut(function (err, res) {
              if (err) {
                $scope.error = {error: true, message: err.message};
              } else {
                $location.path('/signIn');
              }
            });
          };

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
        templateUrl: '/views/admin/topMenu.html'
      };
    }]);
