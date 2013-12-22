'use strict';

angular.module('liltaelApp')
    .factory('Users', ['$resource',
      function ($resource) {
        return $resource('api/v0/users', {}, {});
      }]);
