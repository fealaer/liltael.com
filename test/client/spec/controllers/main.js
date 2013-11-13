'use strict';

describe('StartingPointJsApp', function () {

  // load the controller's module
  var module;
  beforeEach(function () {
    module = angular.module('startingPointJsApp');
  });

  it("should be registered", function () {
    expect(module).not.toBe(null);
  });
});

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('startingPointJsApp'));

  var MainCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(7);
  });
});