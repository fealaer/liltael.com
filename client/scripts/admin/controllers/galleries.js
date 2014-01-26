'use strict';

angular.module('adminApp')
    .controller('GalleriesCtrl', ['$scope', '$routeParams', '$location', 'Galleries', 'Images', function ($scope, $routeParams, $location, Galleries, Images) {
      $scope.action = $routeParams.action;
      $scope.path = $routeParams.path;
      if (!$scope.action) {
        $scope.action = 'add';
      }
      $scope.data = {};
      $scope.images = [];

      function refresh() {
        Galleries.get().$promise.then(function (api) {
          if (api.status.code === 200) {
            $scope.galleries = api.result;
            if ($scope.path) {
              angular.forEach($scope.galleries, function (gallery) {
                if ($scope.path === gallery.path) {
                  $scope.data = gallery;
                }
              })
            }
          }
        });
        var inGallery = [];
        var notInGallery = [];

        Images.get().$promise.then(function (api) {
          if (api.status.code === 200) {
            notInGallery = api.result;
            if ($scope.data) {
              angular.forEach($scope.data.images, function (id) {
                angular.forEach(notInGallery, function (image) {
                  if (image._id === id) {
                    image.selected = true;
                    inGallery.push(image);
                    var index = notInGallery.indexOf(image);
                    if (index > -1) {
                      notInGallery.splice(index, 1);
                    }
                  }
                })
              });
            }
            $scope.images = [].concat(inGallery, notInGallery.reverse());
          }
        });
      }

      $scope.imageSelection = function(image) {
        var index = -1;
        if (image.selected) {
          image.selected = false;
        } else {
          image.selected = true;
        }
      };

      $scope.submit = function (data, type) {
        switch (type) {
          case 'add':
            $scope.add(data);
            break;
          case 'edit':
            $scope.edit(data);
            break;
        }
      };

      $scope.add = function (data) {
        var images = [];
        angular.forEach($scope.images, function (image) {
          if (image.selected) images.push(image._id);
        });
        data.images = images;
        var newPage = new Galleries(data);
        newPage.$save().then(function (api) {
          if (api.status.code === 200) {
            // TODO add msg for user
            $location.path($location.path() + '/' + api.result.path + '/edit');
          }
        });
      };

      $scope.edit = function (data) {
        var images = [];
        angular.forEach($scope.images, function (image) {
          if (image.selected) images.push(image._id);
        });
        data.images = images;
        Galleries.update(data).$promise.then(function (api) {
          if (api.status.code === 200) {
            // TODO add msg for user
            refresh();
          }
        });
      };

      $scope.delete = function (data) {
        Galleries.delete({_id: data._id}).$promise.then(function (api) {
          if (api.status.code === 200) {
            // TODO add msg for user
            $location.path('/galleries');
          }
        });
      };
      // TODO too many refreshes - need to improve
      refresh();
    }]);
