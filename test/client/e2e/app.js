'use strict';

describe('startingPointJsApp', function () {
  it('should redirect / to index.html/#/', function () {
    browser().navigateTo('/');
    expect(browser().location().url()).toBe('/');
  });

  it('should redirect /users to index.html/#/users', function () {
    browser().navigateTo('/#/users');
    expect(browser().location().url()).toBe('/users');
  });
});