'use strict';

angular.module('liltaelApp')
    .factory('Galleries', ['$resource',
      function ($resource) {
        return $resource('api/v0/galleries/:gallery', {}, {});
      }]);
