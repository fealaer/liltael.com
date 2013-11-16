'use strict';

describe('startingPointJsApp', function () {

  beforeEach(function () {
    browser().navigateTo('/');
  });

  it('should redirect / to index.html/#/', function () {
    expect(browser().location().url()).toBe('/');
  });

  describe('Controller: MainCtrl', function () {
    it('should render a list of awesomeThings to the scope', function () {
      expect(repeater('.technology').count()).toBe(6);
    });
  });
});