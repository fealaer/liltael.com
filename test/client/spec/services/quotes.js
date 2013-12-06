'use strict';

describe('Service: Quotes', function () {

  beforeEach(module('startingPointJsApp'));

  var Quotes, httpBackend;
  beforeEach(inject(function (_Quotes_, _$httpBackend_) {
    Quotes = _Quotes_;
    httpBackend = _$httpBackend_;
  }));

  var data, userId, error, result, quote;
  beforeEach(function () {
    quote = 'My name... is Neo.';
    userId = '5260001073657b99d0000001';
    data = {quote: quote, userId: userId};
    error = {
      'status': {'code': 500, 'name': 'Internal server error'},
      'result': {},
      'error': {'code': 500, 'message': 'Internal server error'}
    };
    result = {
      'status': {'code': 200, 'name': 'OK'},
      'result': {quote: quote},
      'error': {}
    };
  });

  it('should do something', function () {
    expect(!!Quotes).to.be(true);
  });

  it('should have method save which send POST request with new quote and userId', function () {
    httpBackend.expectPOST('api/v0/users/{userId}/quotes'.replace('{userId}', userId), data).respond(result);
    var newQuote = new Quotes(data);
    newQuote.$save();
    httpBackend.flush();
    expect(newQuote.result.quote).to.be(quote);
    expect(newQuote.status.code).to.be(200);
    expect(newQuote.status.name).to.be('OK');
    expect(Object.keys(newQuote.error).length === 0).to.be(true);
  });
});
