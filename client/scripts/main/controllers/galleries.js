'use strict';

angular.module('mainApp')
    .controller('GalleriesCtrl', ['$scope', '$routeParams', 'ImagesInGallery', function ($scope, $routeParams, ImagesInGallery) {
      $scope.images = [];
      ImagesInGallery.get($routeParams.gallery).then(function (api) {
        if (api.data.status.code === 200) {
          $scope.images = api.data.result;
        }
      });
    }]);