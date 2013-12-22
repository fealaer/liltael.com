'use strict';

describe('liltaelApp', function () {

  var module;

  beforeEach(function () {
    module = angular.module('liltaelApp');
  });

  it('should be registered', function () {
    expect(module).not.to.be(null);
  });
});