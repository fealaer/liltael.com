'use strict';

angular.module('sharedApp')
    .factory('Galleries', ['$resource',
      function ($resource) {
        return $resource('/api/v0/galleries/:_id', {}, {
          getByField: {method:'GET', url: '/api/v0/galleries/:field/:value', isArray:false},
          update: {method:'PUT', url: '/api/v0/galleries', isArray:false}
        });
      }]);
