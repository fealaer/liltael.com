'use strict';

angular.module('liltaelApp')
    .factory('Quotes', ['$resource',
      function ($resource) {
        return $resource('api/v0/users/:userId/quotes', {userId:'@userId'});
      }]);
