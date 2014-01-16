'use strict';

angular.module('sharedApp')
    .factory('Images', ['$resource',
      function ($resource) {
        return $resource('/images/:_id', {}, {
        });
      }]);
