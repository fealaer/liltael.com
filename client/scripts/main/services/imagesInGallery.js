'use strict';

angular.module('mainApp')
    .service('ImagesInGallery',['$http', function ImagesInGallery($http) {
      ImagesInGallery.prototype.get = function (path) {
        return $http.get('/images/in/gallery/' + path);
      }
    }]);