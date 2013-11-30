'use strict';

describe('Controller: AuthCtrl', function () {

  beforeEach(module('startingPointJsApp'));

  var error, result;
  beforeEach(function(){
    result = {
      "status": {"code": 200, "name": "OK"},
      "result": {},
      "error": {}
    };
    error = {
      "status": {"code": 500, "name": "Internal server error"},
      "result": {},
      "error": {"code": 500, "message": "Internal server error"}
    };
  });

  var mockModal, mockAuth, deferred;
  beforeEach(function () {
    mockModal = {
      open: function () {}
    };
    mockAuth = {
      getUser: function () {
        return {username: 'Neo'}
      },
      subscribe: function (scope, callback) {
        callback();
      },
      signOut: function (callback) {
        if (error) callback(error, null);
        else callback(null, result);
      }
    };
  });

  var spyModalOpen, spyAuthGetUser, spyAuthSubscribe, spyAuthSignOut;
  beforeEach(function () {
    spyModalOpen = sinon.spy(mockModal, 'open');
    spyAuthGetUser = sinon.spy(mockAuth, 'getUser');
    spyAuthSubscribe = sinon.spy(mockAuth, 'subscribe');
    spyAuthSignOut = sinon.spy(mockAuth, 'signOut');
  });

  var scope, AuthCtrl, q;
  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    q = $q;
    AuthCtrl = $controller('AuthCtrl', {$scope: scope, $modal: mockModal, Auth: mockAuth});
  }));

  it('should subscribe on changes in Auth service', function() {
    expect(scope.user).to.eql({username: 'Neo'});
    sinon.assert.calledOnce(spyAuthSubscribe);
    sinon.assert.calledTwice(spyAuthGetUser);
  });

  it('should signOut successfully', function() {
    error = false;
    scope.signOutBtn();
    expect(scope.error).to.be(undefined);
    sinon.assert.calledOnce(spyAuthSignOut);
  });

  it('should signOut poorly', function() {
    scope.signOutBtn();
    expect(scope.error).to.eql(error);
    sinon.assert.calledOnce(spyAuthSignOut);
  });

  it('should create modal dialog for signIn form', function() {
    scope.signInBtn();
    sinon.assert.calledOnce(spyModalOpen);
  });
});