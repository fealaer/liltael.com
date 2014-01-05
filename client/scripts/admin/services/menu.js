'use strict';

angular.module('adminApp')
    .service('Menu', function Menu() {
      Menu.prototype.get = function () {
        return [
          {
            link: '/',
            title: 'Home'
          },
          {
            link: '/pages',
            title: 'Pages'
          }
        ];
      }
    });