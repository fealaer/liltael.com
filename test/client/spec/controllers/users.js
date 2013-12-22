'use strict';

describe('Controller: UsersCtrl', function () {

  beforeEach(module('liltaelApp'));

  var data, userId, error, getUserResult, saveQuoteResult, quote, user;
  beforeEach(function () {
    quote = 'Test quote';
    userId = '5260001073657b99d0000001';
    user = {username: 'Neo', _id: userId};
    data = {quotes: quote};
    getUserResult = {
      'status': {'code': 200, 'name': 'OK'},
      'result': [
        {username: 'Neo', _id: userId, quotes: ['I know kung fu.']},
        {username: 'Trinity', _id: '1'}
      ],
      'error': {}
    };
    saveQuoteResult = {
      'status': {'code': 200, 'name': 'OK'},
      'result': {'recordsAffected': 1},
      'error': {}
    };
    error = {
      'status': {'code': 500, 'name': 'Internal server error'},
      'result': {},
      'error': {'code': 500, 'message': 'Internal server error'}
    };
  });

  var mockUsers, mockQuotes, mockAuth;
  beforeEach(function () {
    mockUsers = {
      get: function () {
        usersDeferred = q.defer();
        return {'$promise': usersDeferred.promise};
      }
    };
    mockQuotes = function Quotes(data) {
      this.data = data;
      this.$save = function() {
        quotesDeferred = q.defer();
        return quotesDeferred.promise;
      };
    };
    mockAuth = {
      getUser: function () {
        return {username: 'Neo', _id: userId};
      },
      subscribe: function (scope, callback) {
        callback();
      }
    };
  });

  var spyUsersGet;
  beforeEach(function () {
    spyUsersGet = sinon.spy(mockUsers, 'get');
  });

  var UsersCtrl, scope, q, usersDeferred, quotesDeferred;
  beforeEach(inject(function ($controller, $rootScope, $q) {
    scope = $rootScope.$new();
    q = $q;
    UsersCtrl = $controller('UsersCtrl', {$scope: scope, Users: mockUsers, Quotes: mockQuotes, Auth: mockAuth});
  }));

  it('should attach a list of users to the scope', function () {
    expect(Object.keys(scope.users).length === 0).to.be(true);
    usersDeferred.resolve(getUserResult);
    scope.$root.$digest();
    expect(scope.users.length).to.be(2);
    sinon.assert.calledOnce(spyUsersGet);
  });

  it('should put Auth.user._id to data from form and call Quotes.$save when form submit', function () {
    usersDeferred.resolve(getUserResult);
    scope.$root.$digest();
    expect(scope.users[0].quotes.length).to.be(1);
    scope.addQuote(data);
    quotesDeferred.resolve(saveQuoteResult);
    scope.$root.$digest();
    expect(scope.users[0].quotes.length).to.be(2);
    expect(scope.users[0].quotes).to.eql(['I know kung fu.', quote]);
  });

  it('should skip attaching a list of users to the scope because of error', function () {
    expect(Object.keys(scope.users).length === 0).to.be(true);
    scope.$root.$digest();
    usersDeferred.resolve(error);
    expect(Object.keys(scope.users).length === 0).to.be(true);
  });
});
