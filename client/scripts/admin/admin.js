'use strict';

angular.module('LocalStorageModule').value('prefix', 'adminApp');
angular.module('adminApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'LocalStorageModule',
  'ui.bootstrap',
  'sharedApp'
])
  .config(function ($routeProvider, $sceProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/views/admin/home.html',
        controller: 'HomeCtrl'
      })
      .when('/pages/:path?/:action?', {
        templateUrl: '/views/admin/pages.html',
        controller: 'PagesCtrl'
      })
      .when('/gallery/:id/:action', {
        templateUrl: '/views/admin/galleries.html',
        controller: 'GalleriesCtrl'
      })
      .when('/images/:id/:action', {
        templateUrl: '/views/admin/images.html',
        controller: 'ImagesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
