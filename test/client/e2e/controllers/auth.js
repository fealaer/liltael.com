'use strict';

describe('Controller: AuthModalCtrl', function () {

  var signIn, signOut;
  beforeEach(function(){
    signIn = element('div.auth button.btn-success');
    signOut = element('div.auth button.btn-warning');
  });

  var modalSignIn, modalCancel, usernameInput, passwordInput;
  beforeEach(function () {
    browser().navigateTo('/');
    modalSignIn = element('div.modal-body button.btn-success');
    modalCancel = element('div.modal-body button.btn-warning');
    usernameInput = input('data.username');
    passwordInput = input('data.password');
  });

  afterEach(function () {
    signOut.click();
  });

  it('should has proper active elements on page after load', function () {
    expect(signIn.text()).toBe('Sign in');
    expect(signOut.text()).toBe('Sign out');
    expect(element('div.auth button:visible').text()).toBe('Sign in');
    expect(element('div.auth button:hidden').text()).toBe('Sign out');
  });

  it('should signIn successfully and toggle buttons', function () {
    signIn.click();
    usernameInput.enter('Neo');
    passwordInput.enter('almostsuper');
    modalSignIn.click();
    expect(element('div.modal')).toBe(undefined);
    expect(element('div.auth button:hidden').text()).toBe('Sign in');
    expect(element('div.auth button:visible').text()).toBe('Sign out');
  });

  it('should signOut successfully and toggle buttons', function () {
    signIn.click();
    usernameInput.enter('Neo');
    passwordInput.enter('almostsuper');
    modalSignIn.click();
    signOut.click();
    expect(element('div.auth button:visible').text()).toBe('Sign in');
    expect(element('div.auth button:hidden').text()).toBe('Sign out');
  });
});