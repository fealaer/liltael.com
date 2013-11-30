angular.module('e2e-http-mock', ['startingPointJsApp', 'ngMockE2E'])
    .run(function ($httpBackend) {
      $httpBackend.whenGET(/^views.*/).passThrough();
      var mocks = [].concat(usersMocks, authMocks);
      for (var i = 0; i < mocks.length; ++i) {
        $httpBackend.when(mocks[i].method, mocks[i].url, mocks[i].data).respond(mocks[i].result);
      }
    });
angular.module('startingPointJsApp').requires.push('e2e-http-mock');