'use strict';

describe('Directive: topMenu', function () {

  beforeEach(module('startingPointJsApp'));

  beforeEach(module('views/topMenu.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope, $compile, $location) {
    $location.path('/users');
    scope = $rootScope.$new();
    element = angular.element('<div data-top-menu></div>');
    element = $compile(element)(scope);
    scope.$digest();
  }));

  it('should create clickable links', function () {
    var links = element.find('ul.nav-pills li a');
    expect(links.length).to.be(2);
    expect(links.eq(0).text()).to.be('Home');
    expect(links.eq(1).text()).to.be('Users');
  });

  it('should has active link User', function () {
    var links = element.find('ul.nav-pills li.active a');
    expect(links.length).to.be(1);
    expect(links.eq(0).text()).to.be('Users');
  });
});
