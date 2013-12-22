'use strict';

angular.module('liltaelApp')
    .service('Menu', function Menu() {
      Menu.prototype.get = function () {
        return [
          {
            link: '/',
            title: 'Home'
          },
          {
            link: '/users',
            title: 'Users'
          }
        ];
      }
    });