'use strict';

angular.module('adminApp')
    .controller('ImagesCtrl', ['$scope', '$http', 'Images', function ($scope, $http, Images) {
      var url = '/images';
      $scope.queue = [];
      $scope.options = {
        url: url
      };
      $scope.loadingFiles = true;
      $http.get(url).then(
          function (response) {
            $scope.loadingFiles = false;
            $scope.queue = response.data.files || [];
          },
          function () {
            $scope.loadingFiles = false;
          }
      );

      $('#fileupload').bind('fileuploadsubmit', function (e, data) {
        data.formData = {title: data.files[0].title};
      });
    }])
    .controller('FileDestroyController', ['$scope', '$http', function ($scope, $http) {
      var file = $scope.file,
          state;
      if (file.url) {
        file.$state = function () {
          return state;
        };
        file.$destroy = function () {
          state = 'pending';
          return $http({
            url: file.deleteUrl,
            method: file.deleteType
          }).then(
              function () {
                state = 'resolved';
                $scope.clear(file);
              },
              function () {
                state = 'rejected';
              }
          );
        };
      } else if (!file.$cancel && !file._index) {
        file.$cancel = function () {
          $scope.clear(file);
        };
      }
    }]);