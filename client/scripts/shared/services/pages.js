'use strict';

angular.module('sharedApp')
    .factory('Pages', ['$resource',
      function ($resource) {
        return $resource('/api/v0/pages/:_id', {}, {
          getByField: {method:'GET', url: '/api/v0/pages/:field/:value', isArray:false},
          update: {method:'PUT', url: '/api/v0/pages', isArray:false},
          move: {method:'PUT', url: '/api/v0/pages/move', isArray:false}
        });
      }]);
