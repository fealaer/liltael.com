'use strict';

angular.module('mainApp')
    .controller('ArtworksCtrl', ['$scope', '$routeParams', 'Galleries', function ($scope, $routeParams, Galleries) {
      Galleries.getByField({field:'path', value: $routeParams.gallery}).$promise.then(function (api) {
        if (api.status.code === 200) {
          $scope.images = api.result.images;
        }
      });
    }]);