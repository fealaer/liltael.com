'use strict';

angular.module('liltaelApp')
    .factory('Recent', ['$resource',
      function ($resource) {
        return $resource('recent/:recent', {}, {});
      }]);