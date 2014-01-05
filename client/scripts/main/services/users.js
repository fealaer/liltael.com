'use strict';

angular.module('mainApp')
    .factory('Users', ['$resource',
      function ($resource) {
        return $resource('api/v0/users', {}, {});
      }]);
