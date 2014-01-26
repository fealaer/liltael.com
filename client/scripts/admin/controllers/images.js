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
              function (response) {
                if (response.data.error) {
                  state = 'rejected';
                  file.error = response.data.error;
                } else {
                  state = 'resolved';
                  $scope.clear(file);
                }
              }
          );
        };
      } else if (!file.$cancel && !file._index) {
        file.$cancel = function () {
          $scope.clear(file);
        };
      }
    }])
    .controller('FileEditController', ['$scope', 'Images', function ($scope, Images) {
      var file = $scope.file,
          state;
      if (file.url) {
        file.$state = function () {
          return state;
        };
        file.$edit = function () {
          state = 'pending';

          return Images.update(file).$promise
              .then(function (api) {
                if (api.status.code === 200) {
                  state = 'resolved';
                } else {
                  state = 'rejected';
                  file.error = api.error.message;
                }
              });
        };
      } else if (!file.$cancel && !file._index) {
        file.$cancel = function () {
          $scope.clear(file);
        };
      }
    }]);