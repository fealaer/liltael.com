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
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/users', {
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
