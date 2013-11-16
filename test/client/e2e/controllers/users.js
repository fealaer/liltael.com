'use strict';

describe('startingPointJsApp', function () {

  beforeEach(function () {
    browser().navigateTo('/#/users');
  });

  it('should redirect /users to index.html/#/users', function () {
    expect(browser().location().url()).toBe('/users');
  });

  describe('Controller: UsersCtrl', function () {
    it('should render a list of Users with their quotes to the scope', function () {
      expect(repeater('.user').count()).toBe(4);
      expect(repeater('.quote').count()).toBe(5);
    });
  });
});