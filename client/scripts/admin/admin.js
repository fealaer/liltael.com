'use strict';

angular.module('LocalStorageModule').value('prefix', 'adminApp');
angular.module('adminApp', [
      'ngCookies',
      'ngResource',
      'ngSanitize',
      'ngRoute',
      'ngCookies',
      'LocalStorageModule',
      'ui.bootstrap',
      'ui.sortable',
      'sharedApp',
      'blueimp.fileupload'
    ])
    .config(['$routeProvider', '$httpProvider', 'fileUploadProvider',
      function ($routeProvider, $httpProvider, fileUploadProvider) {
        $routeProvider
            .when('/', {
              templateUrl: '/views/admin/home.html',
              controller: 'HomeCtrl'
            })
            .when('/pages/:path?/:action?', {
              templateUrl: '/views/admin/pages.html',
              controller: 'PagesCtrl'
            })
            .when('/galleries/:path?/:action?', {
              templateUrl: '/views/admin/galleries.html',
              controller: 'GalleriesCtrl'
            })
            .when('/images', {
              templateUrl: '/views/admin/images.html',
              controller: 'ImagesCtrl'
            })
            .when('/signIn', {
              templateUrl: '/views/admin/signIn.html',
              controller: 'AuthCtrl'
            })
            .otherwise({
              redirectTo: '/'
            });
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        fileUploadProvider.defaults.redirect = window.location.href.replace(
            /\/[^\/]*$/,
            '/cors/result.html?%s'
        );
        angular.extend(fileUploadProvider.defaults, {
          // Enable image resizing, except for Android and Opera,
          // which actually support image resizing, but fail to
          // send Blob objects via XHR requests:
          disableImageResize: /Android(?!.*Chrome)|Opera/
              .test(window.navigator.userAgent),
          maxFileSize: 10000000,
          acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i
        });
      }])
    .run(['$rootScope', '$location', '$http', 'Auth', function ($rootScope, $location, $http, Auth) {
      $rootScope.$on("$routeChangeStart", function (event, next, current) {
          if(!Auth.isLoggedIn() && next.templateUrl !== '/views/admin/signIn.html' ) $location.path('/signIn');
      });
    }]);
