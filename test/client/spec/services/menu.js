'use strict';

describe('Service: Menu', function () {

  // load the service's module
  beforeEach(module('startingPointJsApp'));

  // instantiate service
  var Menu;
  beforeEach(inject(function (_Menu_) {
    Menu = _Menu_;
  }));

  it('should do something', function () {
    expect(!!Menu).toBe(true);
  });

  it('should return array with 2 menu items', function () {
    var menu = Menu.get();
    expect(menu.length).toBe(2);
    expect(menu[0].link).toBe('/');
    expect(menu[0].title).toBe('Home');
    expect(menu[1].link).toBe('/users');
    expect(menu[1].title).toBe('Users');
  });

});
