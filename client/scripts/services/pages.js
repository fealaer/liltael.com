'use strict';

angular.module('liltaelApp')
    .factory('Pages', ['$resource',
      function ($resource) {
        return $resource('api/v0/pages/:pageLink', {}, {});
      }]);
