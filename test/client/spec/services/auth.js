'use strict';

describe('Service: Auth', function () {

  beforeEach(module('startingPointJsApp'));

  var mockScope, Auth, httpBackend, err, user, localStorageService;
  beforeEach(inject(function (_Auth_, _$httpBackend_, _localStorageService_) {
    user = {username: 'Neo'};
    err = {"code": 500, "message": "Internal server error"};
    Auth = _Auth_;
    mockScope = {$on: function(event, callback){}};
    httpBackend = _$httpBackend_;
    localStorageService = _localStorageService_;
    localStorageService.set('user', user);
  }));

  var error, result;
  beforeEach(function () {
    error = {
      "status": {"code": 500, "name": "Internal server error"},
      "result": {},
      "error": err
    };
    result = {
      "status": {"code": 200, "name": "OK"},
      "result": user,
      "error": {}
    };
  });

  var spyAuthBroadcast, spyAuthPostSignOut, spyAuthPostSignIn, spyCallback, spyScopeOn;
    beforeEach(function () {
      spyAuthBroadcast = sinon.spy(Auth.__proto__, 'broadcast');
      spyScopeOn = sinon.spy(mockScope, '$on');
      spyCallback = sinon.spy();
    });

  it('should do something', function () {
    expect(!!Auth).to.be(true);
  });

  it('should return user from localStorage', function() {
    expect(Auth.getUser()).to.eql(user);
  });

  it('should set up event listener on scope', function() {
    Auth.subscribe(mockScope, spyCallback);
    sinon.assert.calledOnce(spyScopeOn);
  });

  it('should set up user to localStorage, call broadcast and callback when signIn successfully', function() {
    httpBackend.expectPOST('/signin', user).respond(result);
    localStorageService.clearAll();
    expect(Auth.getUser()).not.to.be.ok();
    Auth.signIn(user, spyCallback);
    httpBackend.flush();
    sinon.assert.calledOnce(spyAuthBroadcast);
    sinon.assert.calledOnce(spyCallback);
    sinon.assert.calledWith(spyCallback, null, user);
    expect(Auth.getUser()).to.eql(user);
  });

  it('should clear localStorage, call broadcast and callback when signOut successfully', function() {
    httpBackend.expectPOST('/signout').respond(result);
    expect(Auth.getUser()).to.eql(user);
    Auth.signOut(spyCallback);
    httpBackend.flush();
    expect(Auth.getUser()).not.to.be.ok();
    sinon.assert.calledOnce(spyAuthBroadcast);
    sinon.assert.calledOnce(spyCallback);
    sinon.assert.calledWith(spyCallback, null, user);
  });

  it('should call callback with error when signIn poorly', function() {
    httpBackend.expectPOST('/signin', user).respond(error);
    localStorageService.clearAll();
    expect(Auth.getUser()).not.to.be.ok();
    Auth.signIn(user, spyCallback);
    httpBackend.flush();
    sinon.assert.calledOnce(spyCallback);
    sinon.assert.calledWith(spyCallback, err, null);
    expect(Auth.getUser()).not.to.be.ok();
  });

  it('should callback with error when signOut poorly', function() {
    httpBackend.expectPOST('/signout').respond(error);
    expect(Auth.getUser()).to.eql(user);
    Auth.signOut(spyCallback);
    httpBackend.flush();
    expect(Auth.getUser()).to.eql(user);
    sinon.assert.calledOnce(spyCallback);
    sinon.assert.calledWith(spyCallback, err, null);
  });

});
