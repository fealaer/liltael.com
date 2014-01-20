'use strict';

angular.module('mainApp')
    .service('Menu',['$http', function Menu($http) {
      Menu.prototype.get = function (callback) {
        $http.get('/menu').success(function (result) {
          if (result.status.code !== 200) {
            callback(result.error, null);
          } else {
            callback(null, result.result);
          }
        });
      }
    }]);