'use strict';

describe('Controller: AuthModalCtrl', function () {

  beforeEach(module('startingPointJsApp'));
  beforeEach(module('ui.bootstrap.modal'));

  var res, err;
  beforeEach(function() {
    res = {'username': 'Neo'};
    err = {'message': 'Wrong username or password'};
  });

  var mockModal, mockAuth;
  beforeEach(function() {
    mockModal = {
      close: function (param) {},
      dismiss: function (param) {}
    };
    mockAuth = {
      signIn: function(data, callback) {
        if (data.username && data.password) {
          callback(null, res);
        } else {
          callback(err, null);
        }
      }
    };
  });

  var spyAuthSignIn, spyModalClose, spyModalDismiss;
  beforeEach(function() {
    spyAuthSignIn = sinon.spy(mockAuth, 'signIn');
    spyModalClose = sinon.spy(mockModal, 'close');
    spyModalDismiss = sinon.spy(mockModal, 'dismiss');
  });

  var scope, AuthModalCtrl;
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AuthModalCtrl = $controller('AuthModalCtrl', {
      $scope: scope,
      $modalInstance: mockModal,
      Auth: mockAuth
    });
  }));

  it('should dismiss Modal when cancel method called', function () {
    scope.cancel();
    sinon.assert.calledOnce(spyModalDismiss);
  });

  it('should signIn successfully and close Modal with result', function () {
    scope.signIn({username: 'name', password: 'pass'});
    sinon.assert.calledOnce(spyAuthSignIn);
    sinon.assert.calledOnce(spyModalClose);
    sinon.assert.calledWith(spyModalClose, res);
    expect(scope.error).to.eql({error: false});
  });

  it('should signIn poorly and add error to the scope', function () {
    scope.signIn({username: 'name'});
    sinon.assert.calledOnce(spyAuthSignIn);
    expect(scope.error).to.eql({error:true, message: err.message});
  });
});