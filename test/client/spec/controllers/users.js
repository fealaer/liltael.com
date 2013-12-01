'use strict';

describe('Controller: UsersCtrl', function () {

  beforeEach(module('startingPointJsApp'));

  var mockUsers, mockAuth;
  beforeEach(function () {
    mockUsers = {
      get: function () {
        deferred = q.defer();
        return {"$promise": deferred.promise};
      }
    };
  });

  var spyUsersGet;
  beforeEach(function () {
    spyUsersGet = sinon.spy(mockUsers, 'get');
  });

  var UsersCtrl, scope, q, deferred;
  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    q = $q;
    UsersCtrl = $controller('UsersCtrl', {$scope: scope, Users: mockUsers});
  }));

  var error, result;
  beforeEach(function () {
    result = {
      "status": {"code": 200, "name": "OK"},
      "result": [
        {username: 'Neo'},
        {username: 'Trinity'}
      ],
      "error": {}
    };
    error = {
      "status": {"code": 500, "name": "Internal server error"},
      "result": {},
      "error": {"code": 500, "message": "Internal server error"}
    };
  });

  it('should attach a list of users to the scope', function () {
    expect(Object.keys(scope.users).length === 0).to.be(true);
    deferred.resolve(result);
    scope.$root.$digest();
    expect(scope.users.length).to.be(2);
    sinon.assert.calledOnce(spyUsersGet);
  });

  it('should skip attaching a list of users to the scope because of error', function () {
    expect(Object.keys(scope.users).length === 0).to.be(true);
    scope.$root.$digest();
    deferred.resolve(error);
    expect(Object.keys(scope.users).length === 0).to.be(true);
  });
});
