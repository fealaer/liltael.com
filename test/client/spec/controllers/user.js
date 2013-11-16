'use strict';

describe('Controller: UsersCtrl', function () {

  // load the controller's module
  beforeEach(module('startingPointJsApp'));

  var UserCtrl, scope, $httpBackend;

  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserCtrl = $controller('UsersCtrl', {$scope: scope});
  }));

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
      expect(Object.keys(scope.users).length === 0).toBe(true);
      $httpBackend.flush();
      expect(scope.users.length).toBe(2);
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
      expect(Object.keys(scope.users).length === 0).toBe(true);
      $httpBackend.flush();
      expect(Object.keys(scope.users).length === 0).toBe(true);
    });
  });
});
