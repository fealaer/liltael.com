angular.module('e2e-http-mock', ['liltaelApp', 'ngMockE2E'])
    .run(function ($httpBackend) {
      $httpBackend.whenGET(/^views.*/).passThrough();
      var mocks = [].concat(usersMocks, authMocks, quotesMocks);
      for (var i = 0; i < mocks.length; ++i) {
        $httpBackend.when(mocks[i].method, mocks[i].url, mocks[i].data).respond(mocks[i].result);
      }
    });
angular.module('liltaelApp').requires.push('e2e-http-mock');