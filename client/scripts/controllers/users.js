'use strict';

angular.module('startingPointJsApp')
    .controller('UsersCtrl', ['$scope', 'Users', 'Quotes', 'Auth', function ($scope, Users, Quotes, Auth) {
      $scope.user = Auth.getUser();
      Auth.subscribe($scope, function (){
        $scope.user = Auth.getUser();
      });
      $scope.users = [];
      Users.get().$promise.then(function (api) {
        if (api.status.code === 200) {
          $scope.users = api.result;
        }
      });
      $scope.addQuote = function (data) {
        data.userId = $scope.user._id;
        var newQuote = new Quotes(data);
        newQuote.$save().then(function (api) {
          if (api.status.code === 200) {
            for (var i = 0; i < $scope.users.length; i++) {
              if ($scope.users[i]._id === api.result.userId) {
                $scope.users[i].quotes.push(api.result.quote);
                break;
              }
            }
            $scope.data.quote = '';
          }
        });
      };
    }]);
