'use strict';

angular.module('adminApp')
    .controller('PagesCtrl', ['$scope', '$routeParams', '$location', 'Pages', function ($scope, $routeParams, $location, Pages) {
      $scope.action = $routeParams.action;
      $scope.path = $routeParams.path;
      if (!$scope.action) {
        $scope.action = 'add';
      }

      marked.setOptions({
        // Configure syntax highligher support using [Google Code Prettify](https://code.google.com/p/google-code-prettify/)
        highlight: function(code, lang) {
          return prettyPrintOne(code, lang, true);
        }
      });

      $scope.getHeight = function() {
          return $(window).height();
      };

      $scope.$watch($scope.getHeight, function () {
        resize();
      });

      window.onresize = function(){
          $scope.$apply();
      };

      function resize() {
        var height = $scope.getHeight() - $('.form-inline').height() - $('.footer').height() - $('.navbar').height() - 80;
        $('.markdown-preview').height(height);
        $('.markdown-editor').height(height);
      }

      var defaultData = {raw:''};
      $scope.data = angular.copy(defaultData);

      //TODO need to prevent so many refreshes

      $scope.$watch('data', function() {
        var video = /.*\[video\]\s*(\w*)\s*:\s*(?:[\"\']|&quot;|&#39;)([\d\w]*)(?:[\"\']|&quot;|&#39;)\s*,\s*title\s*:\s*(?:[\"\']|&quot;|&#39;)([\d\s\w\-\.\(\)]*)(?:[\"\']|&quot;|&#39;)\s*\[\/video\].*\n*/ig;
        var html = marked($scope.data.raw);
        html = html.replace(video, '<span data-video-player data-video="{$1:\'$2\', title:\'$3\'}"></span>');
        $scope.data.html = html;
      }, true);

      function refresh() {
        Pages.get().$promise.then(function (api) {
          if (api.status.code === 200) {
            $scope.pages = api.result;
            if ($scope.path) {
              angular.forEach($scope.pages, function(page) {
                if ($scope.path === page.path) {
                  $scope.data = page;
                }
              })
            }
          }
        });
      }

      $scope.submit = function (data, type) {
        switch (type) {
          case 'add':
            $scope.add(data); break;
          case 'edit':
            $scope.edit(data); break;
        }
      };

      $scope.add = function(data) {
        var newPage = new Pages(data);
        newPage.$save().then(function (api) {
          if (api.status.code === 200) {
            // TODO add msg for user
            $location.path($location.path() + '/' + api.result.path + '/edit');
          }
        });
      };

      $scope.edit = function(data) {
        Pages.update(data).$promise.then(function (api) {
          if (api.status.code === 200) {
            // TODO add msg for user
            refresh();
          }
        });
      };

      $scope.delete = function(data) {
        Pages.delete({_id: data._id}).$promise.then(function (api) {
          if (api.status.code === 200) {
            // TODO add msg for user
            $location.path('/pages');
          }
        });
      };
      // TODO too many refreshes - need to improve
      refresh();
    }]);
