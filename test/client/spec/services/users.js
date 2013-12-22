'use strict';

describe('Service: User', function () {

  beforeEach(module('liltaelApp'));

  var Users, $httpBackend;
  beforeEach(inject(function (_Users_, _$httpBackend_) {
    Users = _Users_;
    $httpBackend = _$httpBackend_;
  }));

  var error, result;
  beforeEach(function () {
    error = {
      'status': {'code': 500, 'name': 'Internal server error'},
      'result': {},
      'error': {'code': 500, 'message': 'Internal server error'}
    };
    result = {
      'status': {'code': 200, 'name': 'OK'},
      'result': [
        {username: 'Neo'},
        {username: 'Trinity'}
      ],
      'error': {}
    };
  });

  it('should do something', function () {
    expect(!!Users).to.be(true);
  });

  var users;
  it('should attach a list of users to the scope', function () {
    $httpBackend.expectGET('api/v0/users').respond(result);
    users = Users.get();
    $httpBackend.flush();
    expect(users.result.length).to.be(2);
    expect(users.status.code).to.be(200);
    expect(users.status.name).to.be('OK');
    expect(Object.keys(users.error).length === 0).to.be(true);
  });

  it('should skip attaching a list of users to the scope because of error', function () {
    $httpBackend.expectGET('api/v0/users').respond(error);
    users = Users.get();
    $httpBackend.flush();
    expect(Object.keys(users.result).length).to.be(0);
    expect(users.status.code).to.be(500);
    expect(users.status.name).to.be('Internal server error');
    expect(users.error.code).to.be(500);
    expect(users.error.message).to.be('Internal server error');
  });
});
