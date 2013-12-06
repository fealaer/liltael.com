'use strict';

describe('Controller: UsersCtrl', function () {

  beforeEach(function () {
    browser().navigateTo('/#/users');
  });

  var signIn, modalSignIn, usernameInput, passwordInput;;
  beforeEach(function(){
    signIn = element('div.auth button.btn-success');
    modalSignIn = element('div.modal-body button.btn-success');
    usernameInput = input('data.username');
    passwordInput = input('data.password');
  });

  it('should redirect /users to index.html/#/users', function () {
    expect(browser().location().url()).toBe('/users');
  });

  it('should render a list of Users with their quotes to the scope', function () {
    expect(repeater('.user').count()).toBe(4);
    expect(repeater('.quote').count()).toBe(5);
  });

  it('should render users, quotes and addQuoteFrom when user authorized', function () {
    expect(element('div.addQuote:hidden').count()).toBe(1);
    signIn.click();
    usernameInput.enter('Neo');
    passwordInput.enter('almostsuper');
    modalSignIn.click();
    expect(repeater('.user').count()).toBe(4);
    expect(repeater('.quote').count()).toBe(5);
    expect(element('div.addQuote:visible').count()).toBe(1);
  });

  it('should add new quote and show it in view', function () {
    signIn.click();
    usernameInput.enter('Neo');
    passwordInput.enter('almostsuper');
    modalSignIn.click();
    expect(repeater('.user').count()).toBe(4);
    expect(repeater('.quote').count()).toBe(5);
    input('data.quote').enter('My name... is Neo.');
    element('.addQuote :submit').click();
    expect(repeater('.user').count()).toBe(4);
    expect(repeater('.quote').count()).toBe(6);
    input('data.quote').enter('Choice, the problem is choice.');
    element('.addQuote :submit').click();
    expect(repeater('.user').count()).toBe(4);
    expect(repeater('.quote').count()).toBe(7);
  });
});