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
    var quoteInput = input('data.quote'),
        submitButton = 'div.addQuote :submit',
        quoteInputElement = 'div.addQuote :input';
    var quote1 = 'My name... is Neo.',
        quote2 = 'Choice, the problem is choice.';
    signIn.click();
    usernameInput.enter('Neo');
    passwordInput.enter('almostsuper');
    modalSignIn.click();
    expect(repeater('.user').count()).toBe(4);
    expect(repeater('.quote').count()).toBe(5);
    quoteInput.enter(quote1);
    expect(element(quoteInputElement).val()).toBe(quote1);
    element(submitButton).click();
    expect(repeater('.user').count()).toBe(4);
    expect(repeater('.quote').count()).toBe(6);
    expect(element(quoteInputElement).val()).toBe('');
    quoteInput.enter(quote2);
    expect(element(quoteInputElement).val()).toBe(quote2);
    element(submitButton).click();
    expect(repeater('.user').count()).toBe(4);
    expect(repeater('.quote').count()).toBe(7);
    expect(element(quoteInputElement).val()).toBe('');
  });
});