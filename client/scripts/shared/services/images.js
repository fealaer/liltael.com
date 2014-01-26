'use strict';

angular.module('sharedApp')
    .factory('Images', ['$resource',
      function ($resource) {
        return $resource('/api/v0/images/:_id', {}, {
          update: {method:'PUT', url: '/api/v0/images', isArray:false}
        });
      }]);
