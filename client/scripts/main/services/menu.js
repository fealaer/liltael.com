'use strict';

angular.module('mainApp')
    .service('Menu', function Menu() {
      Menu.prototype.get = function () {
        return [
          {
            link: '/about',
            title: 'About'
          },
          {
            link: '/animation',
            title: 'Animation'
          },
          {
            link: '/resume',
            title: 'Resume'
          },
          {
            link: '',
            title: 'Artworks',
            dropdown: true,
            nestedMenu: [
              {
                link: '/artworks/sketches',
                title: 'Sketches'
              },
              {
                link: '/artworks/classical_drawings',
                title: 'Classical Drawings'
              },
              {
                link: '/artworks/3d',
                title: '3d'
              },
              {
                link: '/artworks/2d',
                title: '2d'
              }
            ]
          }
        ];
      }
    });