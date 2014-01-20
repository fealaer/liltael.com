'use strict';

describe('Service: Menu', function () {

  // load the service's module
  beforeEach(module('liltaelApp'));

  // instantiate service
  var Menu;
  beforeEach(inject(function (_Menu_) {
    Menu = _Menu_;
  }));

  it('should do something', function () {
    expect(!!Menu).to.be(true);
  });

  it('should return array with 2 menu items', function () {
    var menu = Menu.get();
    expect(menu.length).to.be(2);
    expect(menu[0].link).to.be('/');
    expect(menu[0].title).to.be('Home');
    expect(menu[1].link).to.be('/users');
    expect(menu[1].title).to.be('Users');
  });

});
