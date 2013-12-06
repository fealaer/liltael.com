'use strict';

describe('Controller: UsersCtrl', function () {

  beforeEach(function () {
    browser().navigateTo('/#/users');
  });

  var signOut;
  beforeEach(function(){
    signOut = element('div.auth button.btn-warning');
    signOut.click();
  });

  it('should redirect /users to index.html/#/users', function () {
    expect(browser().location().url()).toBe('/users');
  });

  it('should render a list of Users with their quotes to the scope', function () {
    expect(repeater('.user').count()).toBe(4);
    expect(repeater('.quote').count()).toBe(5);
  });

  it('should have hidden form for adding new quote when user not authorized', function(){
    expect(element('div.addQuote:hidden').count()).toBe(1);
  });

  describe('when user authorized', function(){

    var signIn, modalSignIn, usernameInput, passwordInput;
    beforeEach(function(){
      signIn = element('div.auth button.btn-success');
      modalSignIn = element('div.modal-body button.btn-success');
      usernameInput = input('data.username');
      passwordInput = input('data.password');
    });

    var quoteInput, submitButton, quoteInputElement, quote1, quote2, errorMessages;
    beforeEach(function () {
      quoteInput = input('data.quote');
      submitButton = 'div.addQuote :submit';
      quoteInputElement = 'div.addQuote :input';
      errorMessages = 'div.addQuote div:visible.alert';
      quote1 = 'My name... is Neo.';
      quote2 = 'Choice, the problem is choice.';
    });

    beforeEach(function() {
      signIn.click();
      usernameInput.enter('Neo');
      passwordInput.enter('almostsuper');
      modalSignIn.click();
    });

    it('should render users, quotes and addQuoteFrom when user authorized', function () {
        expect(repeater('.user').count()).toBe(4);
        expect(repeater('.quote').count()).toBe(5);
        expect(element('div.addQuote:visible').count()).toBe(1);
      });

      it('should add new quote, clear form and show new quote in view', function () {
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

      it('should change errors status when values change and form submit', function () {
        expect(element(errorMessages).count()).toBe(0);
        quoteInput.enter('u');
        expect(element(errorMessages).count()).toBe(0);
        quoteInput.enter('');
        expect(element(errorMessages).count()).toBe(1);
        quoteInput.enter(quote1);
        expect(element(errorMessages).count()).toBe(0);
        element(submitButton).click();
        expect(element(quoteInputElement).val()).toBe('');
        expect(element(errorMessages).count()).toBe(0);
      });
  });
});