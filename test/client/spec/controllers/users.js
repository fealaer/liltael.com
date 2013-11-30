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
    mockAuth = {
      user: null,
      getUser: function () {
        return this.user;
      },
      subscribe: function (scope, callback) {
        this.user = {username: 'Neo'};
        callback();
      }
    };
  });

  var spyUsersGet, spyAuthGetUser, spyAuthSubscribe;
  beforeEach(function () {
    spyUsersGet = sinon.spy(mockUsers, 'get');
    spyAuthGetUser = sinon.spy(mockAuth, 'getUser');
    spyAuthSubscribe = sinon.spy(mockAuth, 'subscribe');
  });

  var UsersCtrl, scope, q, deferred;
  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    q = $q;
    UsersCtrl = $controller('UsersCtrl', {$scope: scope, Users: mockUsers, Auth: mockAuth});
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

  it('should subscribe on changes in Auth service', function () {
    deferred.resolve(result);
    scope.$root.$digest();
    expect(scope.users.length).to.be(2);
    expect(scope.user).to.eql({username: 'Neo'});
    sinon.assert.calledOnce(spyUsersGet);
    sinon.assert.calledOnce(spyAuthSubscribe);
    sinon.assert.calledTwice(spyAuthGetUser);
  });
});
