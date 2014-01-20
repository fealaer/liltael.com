'use strict';

angular.module('mainApp')
  .controller('PagesCtrl', ['$scope', '$routeParams', '$sce', 'Pages', function ($scope, $routeParams, $sce, Pages) {
    Pages.getByField({field:'path', value: $routeParams.pageLink}).$promise.then(function (api) {
      if (api.status.code === 200) {
        $scope.page = api.result;
      }
    });
  }]);
