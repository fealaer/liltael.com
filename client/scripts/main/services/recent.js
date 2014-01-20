'use strict';

angular.module('mainApp')
    .factory('Recent', ['$resource',
      function ($resource) {
        return $resource('recent/:recent', {}, {});
      }]);