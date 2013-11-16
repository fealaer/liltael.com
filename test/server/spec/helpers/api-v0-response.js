'use strict';

var rekuire = require('rekuire'),
    ApiResponse = rekuire('server/helpers/api/v0/response'),
    ApiStatus = rekuire('server/helpers/api/v0/status'),
    ApiError = rekuire('server/helpers/api/v0/error');

describe('Api Response V0:', function () {

  it('should create new ApiResponse with valid result', function () {
    var records = [1, 2];
    var res = new ApiResponse(null, records);
    expect(res.result).toBe(records);
    expect(res.status).toBe(ApiStatus.S200);
    expect(Object.keys(res.error).length === 0).toBe(true);
  });

  it('should create new ApiResponse with error and 500 status', function () {
    var res = new ApiResponse(new ApiError(null, 500, 'Internal server error'), null);
    expect(res.status).toBe(ApiStatus.S500);
    expect(Object.keys(res.error).length !== 0).toBe(true);
    expect(res.error.message).toBe('Internal server error');
    expect(res.error.code).toBe(500);
    expect(res.error.moreInfo).toBe('http://localhost:3000/api/v0/docs/errors/500');
    expect(Object.keys(res.result).length === 0).toBe(true);
  });

  it('should create new ApiResponse with error and 404 status', function () {
    var res = new ApiResponse(new ApiError(null, 404, 'Record not found'), null);
    expect(res.status).toBe(ApiStatus.S404);
    expect(res.error.message).toBe('Record not found');
    expect(res.error.code).toBe(404);
    expect(res.error.moreInfo).toBe('http://localhost:3000/api/v0/docs/errors/404');
    expect(Object.keys(res.result).length === 0).toBe(true);
  });

  it('should throw exception when try to create ApiResponse with error and result simultaneously', function () {
    expect(function(){new ApiResponse(new ApiError(null, 404, 'Record not found'), [1, 2]);})
        .toThrow("Internal server error: Illegal arguments for ApiResponse. Server can't return valid response.");
  });

  it('should throw exception when try to create ApiResponse with out error or result simultaneously', function () {
    expect(function(){new ApiResponse(null, null);})
        .toThrow("Internal server error: Illegal arguments for ApiResponse. Server can't return valid response.");
  });
});