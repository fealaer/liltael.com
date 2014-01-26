'use strict';

angular.module('LocalStorageModule').value('prefix', 'mainApp');
angular.module('mainApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'LocalStorageModule',
  'ui.bootstrap',
  'sharedApp'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/:pageLink', {
        templateUrl: '/views/main/pages.html',
        controller: 'PagesCtrl'
      })
      .when('/artworks/:gallery', {
        templateUrl: '/views/main/galleries.html',
        controller: 'GalleriesCtrl'
      })
      .otherwise({
        redirectTo: '/about'
      });
  });
