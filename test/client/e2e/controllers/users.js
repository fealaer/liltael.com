'use strict';

describe('Controller: UsersCtrl', function () {

  beforeEach(function () {
    browser().navigateTo('/#/users');
  });

  it('should redirect /users to index.html/#/users', function () {
    expect(browser().location().url()).toBe('/users');
  });

  it('should render a list of Users with their quotes to the scope', function () {
    expect(repeater('.user').count()).toBe(4);
    expect(repeater('.quote').count()).toBe(5);
  });
});