'use strict';

angular.module('startingPointJsApp')
    .factory('User', ['$resource',
      function ($resource) {
        return $resource('api/v0/users', {}, {});
      }]);
