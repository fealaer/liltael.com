'use strict';

describe('StartingPointJSApp', function () {

  // load the controller's module
  var module;
  beforeEach(function () {
    module = angular.module('StartingPointJSApp');
  });

  it("should be registered", function () {
    module.should.not.equal(null);
  });
});

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('StartingPointJSApp'));

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
    scope.should.have.property('awesomeThings').with.length(7);
  });
});