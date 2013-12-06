'use strict';

describe('Controller: MainCtrl', function () {

  beforeEach(function () {
    browser().navigateTo('/');
  });

  it('should redirect / to index.html/#/', function () {
    expect(browser().location().url()).toBe('/');
  });

  it('should render a list of awesomeThings to the scope', function () {
    expect(repeater('.technology').count()).toBe(13);
  });
});