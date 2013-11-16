'use strict';

describe('startingPointJsApp', function () {

  beforeEach(function () {
    browser().navigateTo('/');
  });

  describe('Directive: TopMenu', function () {

    it('should has active link Home', function () {
      var links = element('ul.nav-pills li.active a');
      expect(links.text()).toBe('Home');
    });

    it('should navigate to ', function () {
      var link = element('ul.nav-pills li a:not(.active)');
      link.click();
      var nextLink = element('ul.nav-pills li.active a');
      expect(nextLink.text()).toBe('Users');
    });
  });
});