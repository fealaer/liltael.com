'use strict';

describe('Service: User', function () {

  // load the service's module
  beforeEach(module('startingPointJsApp'));

  // instantiate service
  var User, $httpBackend, users;

  beforeEach(inject(function (_User_) {
    User = _User_;
  }));

  it('should do something', function () {
    expect(!!User).toBe(true);
  });

  describe('Good respond', function () {
      // Initialize the controller and a mock scope
      beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('api/v0/users').
            respond({
              "status": {
                "code": 200,
                "name": "OK"
              },
              "result": [
                {username: 'Neo'},
                {username: 'Trinity'}
              ],
              "error": {}
            });
      }));

      it('should attach a list of users to the scope', function () {
        users = User.get();
        $httpBackend.flush();
        expect(users.result.length).toBe(2);
        expect(users.status.code).toBe(200);
        expect(users.status.name).toBe('OK');
        expect(Object.keys(users.error).length === 0).toBe(true);
      });
    });

    describe('Bad respond', function () {
      // Initialize the controller and a mock scope
      beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('api/v0/users').
            respond({
              "status": {
                "code": 500,
                "name": "Internal server error"
              },
              "result": [],
              "error": {
                "code": 500,
                "message": "Internal server error"
              }
            });
      }));
      it('should skip attaching a list of users to the scope because of error', function () {
        users = User.get();
        $httpBackend.flush();
        expect(users.result.length).toBe(0);
        expect(users.status.code).toBe(500);
        expect(users.status.name).toBe('Internal server error');
        expect(users.error.code).toBe(500);
        expect(users.error.message).toBe('Internal server error');

      });
    });



});
