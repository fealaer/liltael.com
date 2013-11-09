'use strict';

describe('StartingPointJSApp', function () {

  var tester,
      appName = 'StartingPointJSApp';

  // load the controller's module
  var module;
  beforeEach(function () {
    module = angular.module(appName);
  });

  it("should be registered", function () {
    expect(module).not.to.equal(null);
  });

  it('should have a MainCtrl controller', function () {
    expect(module.MainCtrl).not.to.equal(null);
  });

  describe('MainCtrl', function () {
    var MainCtrl,
        scope;
    console.log(angular.mock.inject);
    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
      scope = $rootScope.$new();
      MainCtrl = $controller('MainCtrl', {
        $scope: scope
      });
    }));

    it('should attach a list of awesomeThings to the scope', function () {
      expect(scope.awesomeThings.length).toBe(5);
    });
  });
});
