'use strict';

describe('Directive: TopMenu', function () {

  beforeEach(function () {
    browser().navigateTo('/');
  });

  it('should has active link Home', function () {
    var links = element('ul.nav-pills li.active a');
    expect(links.text()).toBe('Home');
  });

  it('should navigate to Users', function () {
    var link = element('ul.nav-pills li a:not(.active)');
    link.click();
    var nextLink = element('ul.nav-pills li.active a');
    expect(nextLink.text()).toBe('Users');
  });
});