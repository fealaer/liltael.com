'use strict';

var rekuire = require('rekuire'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should();
chai.Assertion.includeStack = true;

var ApiResponse = rekuire('server/helpers/api/v0/response'),
    ApiStatus = rekuire('server/helpers/api/v0/status'),
    ApiError = rekuire('server/helpers/api/v0/error');

describe('Api Response V0:', function () {

  it('should create new ApiResponse with valid result', function () {
    var records = [1, 2];
    var res = new ApiResponse(null, records);
    res.should.have.property('result', records);
    res.should.have.property('status', ApiStatus.S200);
    res.should.have.property('error').with.be.empty;
  });

  it('should create new ApiResponse with error and 500 status', function () {
    var res = new ApiResponse(new ApiError(null, 500, 'Internal server error'), null);
    res.should.have.property('status', ApiStatus.S500);
    res.should.have.property('error');
    res.error.should.have.property('message', 'Internal server error');
    res.error.should.have.property('code', 500);
    res.error.should.have.property('moreInfo', 'http://localhost:3000/api/v0/docs/errors/500');
    res.should.have.property('result').with.be.empty;
  });

  it('should create new ApiResponse with error and 404 status', function () {
    var res = new ApiResponse(new ApiError(null, 404, 'Record not found'), null);
    res.should.have.property('status', ApiStatus.S404);
    res.should.have.property('error');
    res.error.should.have.property('message', 'Record not found');
    res.error.should.have.property('code', 404);
    res.error.should.have.property('moreInfo', 'http://localhost:3000/api/v0/docs/errors/404');
    res.should.have.property('result').with.be.empty;
  });

  it('should throw exception when try to create ApiResponse with error and result simultaneously', function () {
    (function(){new ApiResponse(new ApiError(null, 404, 'Record not found'), [1, 2]);})
        .should.throw("Internal server error: Illegal arguments for ApiResponse. Server can't return valid response.");
  });

  it('should throw exception when try to create ApiResponse with out error or result simultaneously', function () {
    (function(){new ApiResponse(null, null);})
        .should.throw("Internal server error: Illegal arguments for ApiResponse. Server can't return valid response.");
  });
});