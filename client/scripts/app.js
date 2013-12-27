'use strict';

angular.module('LocalStorageModule').value('prefix', 'liltaelApp');
angular.module('liltaelApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'LocalStorageModule',
  'ui.bootstrap'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/:pageLink', {
        templateUrl: 'views/pages.html',
        controller: 'PagesCtrl'
      })
      .when('/artworks/:gallery', {
        templateUrl: 'views/artworks.html',
        controller: 'ArtworksCtrl'
      })
      .otherwise({
        redirectTo: '/about'
      });
  });
