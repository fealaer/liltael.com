'use strict';

angular.module('liltaelApp')
  .controller('PagesCtrl', ['$scope', '$routeParams', '$sce', 'Pages', function ($scope, $routeParams, $sce, Pages) {
    Pages.get({pageLink: $routeParams.pageLink}).$promise.then(function (api) {
      if (api.status.code === 200) {
        $scope.page = api.result;
      }
    });
  }]);
