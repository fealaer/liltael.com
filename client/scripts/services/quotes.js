'use strict';

angular.module('startingPointJsApp')
    .factory('Quotes', ['$resource',
      function ($resource) {
        return $resource('api/v0/users/:userId/quotes', {userId:'@userId'});
      }]);
