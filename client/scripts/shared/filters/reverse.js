'use strict';

angular.module('sharedApp')
    .filter('reverse', function () {
      return function (items) {
        if (!angular.isArray(items)) return null;
        return items.slice().reverse();
      };
    });