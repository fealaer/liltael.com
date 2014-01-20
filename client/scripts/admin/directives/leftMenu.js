'use strict';

angular.module('adminApp')
    .directive('leftMenu', ['$location', function ($location) {
      return {
        restrict: 'A',
        transclude: true,
        scope: {
          items: '=',
          path: '@',
          link: '@',
          title: '@'
        },
        controller: function ($scope) {
          var defMenu = [{link: '/' + $scope.path, title: 'Add New', selected: true, badge: '+'}];
          $scope.menuItems = angular.copy(defMenu);
          $scope.items = [];
          $scope.makeLink = function (link) {
            return '/' + $scope.path + '/' + link + '/edit';
          };

          $scope.refresh = function (items) {
            $scope.menuItems = angular.copy(defMenu);
            angular.forEach(items, function (menuItem) {
              $scope.menuItems.push({
                link: $scope.makeLink(menuItem[$scope.link]),
                title: menuItem[$scope.title]
              });
            });
          };

          $scope.$watch('items', function() {
            $scope.refresh($scope.items);
            $scope.select($location.path());
          });

          $scope.select = function (path) {
            angular.forEach($scope.menuItems, function (menuItem) {
              menuItem.selected = menuItem.link === path;
            });
          };
        },
        templateUrl: '/views/admin/leftMenu.html'
      };
    }]);
