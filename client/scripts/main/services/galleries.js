'use strict';

angular.module('mainApp')
    .factory('Galleries', ['$resource',
      function ($resource) {
        return $resource('api/v0/galleries/:gallery', {}, {});
      }]);
