'use strict';

describe('StartingPointJsApp', function () {

  var module;

  beforeEach(function () {
    module = angular.module('startingPointJsApp');
  });

  it('should be registered', function () {
    expect(module).not.to.be(null);
  });
});