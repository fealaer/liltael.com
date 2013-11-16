'use strict';

angular.module('startingPointJsApp')
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