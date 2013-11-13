'use strict';

describe('startingPointJsApp', function () {


  it('should redirect / to index.html/#/', function () {
    browser().navigateTo('/');
    expect(browser().location().url()).toBe('/');
  });

  describe('Controller: MainCtrl', function () {

    beforeEach(function () {
      browser().navigateTo('/');
    });

    it('should render a list of awesomeThings to the scope', function () {
      expect(repeater('.technology').count()).toBe(7);
    });
  });
});