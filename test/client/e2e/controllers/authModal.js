'use strict';

describe('Controller: AuthModalCtrl', function () {

  var signIn, signOut;
  var errorMessages = 'div.modal-body div:visible.alert';

  beforeEach(function(){
    signIn = element('div.auth button.btn-success');
    signOut = element('div.auth button.btn-warning');
  });

  var modalSignIn, modalCancel, usernameInput, passwordInput;
  beforeEach(function () {
    browser().navigateTo('/');
    signIn.click();
    modalSignIn = element('div.modal-body button.btn-success');
    modalCancel = element('div.modal-body button.btn-warning');
    usernameInput = input('data.username');
    passwordInput = input('data.password');
  });

  afterEach(function () {
    signOut.click();
  });

  it('should has proper active elements on page', function () {
    expect(modalCancel.text()).toBe('Cancel');
    expect(modalSignIn.text()).toBe('Sign in');
  });

  it('should dismiss Modal when cancel button clicked', function () {
    modalCancel.click();
    expect(element('div.modal')).toBe(undefined);
  });

  it('should signIn successfully and close Modal with result', function () {
    usernameInput.enter('Neo');
    passwordInput.enter('almostsuper');
    modalSignIn.click();
    expect(element('div.modal')).toBe(undefined);
  });

  it('should signIn poorly and add error to modal', function () {
    usernameInput.enter('Neo');
    passwordInput.enter('super');
    modalSignIn.click();
    expect(element(errorMessages).count()).toBe(1);
  });

  it('should hide error after poorly signIn when value changed', function () {
    usernameInput.enter('Neo');
    passwordInput.enter('super');
    modalSignIn.click();
    expect(element(errorMessages).count()).toBe(1);
    passwordInput.enter('super1');
    expect(element(errorMessages).count()).toBe(0);
  });

  it('should change errors status when values change', function () {
    expect(element(errorMessages).count()).toBe(0);
    usernameInput.enter('u');
    passwordInput.enter('p');
    expect(element(errorMessages).count()).toBe(0);
    usernameInput.enter('');
    expect(element(errorMessages).count()).toBe(1);
    passwordInput.enter('');
    expect(element(errorMessages).count()).toBe(2);
    passwordInput.enter('p');
    expect(element(errorMessages).count()).toBe(1);
    usernameInput.enter('u');
    expect(element(errorMessages).count()).toBe(0);
  });
});