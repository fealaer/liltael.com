'use strict';

var rekuire = require('rekuire'),
    ApiError = rekuire('server/helpers/api/v0/error');

describe('Api Error V0:', function () {

  it('should create new ApiError based on ValidatorError', function () {
    var err =
    { message: 'Validation failed',
      name: 'ValidationError',
      errors: {
        username: {
          message: 'Validator "required" failed for path username',
          name: 'ValidatorError',
          path: 'username',
          type: 'required'
        },
        password: {
          message: 'Validator "required" failed for path password',
          name: 'ValidatorError',
          path: 'password',
          type: 'required'
        }
      }
    };
    var error = new ApiError(err, 404, 'Record not found');
    expect(error.message).toBe('Validation failed');
    expect(error.code).toBe(400);
    expect(error.moreInfo).toBe('http://localhost:3000/api/v0/docs/errors/400');
    expect(error.errors.length).toBe(2);
    expect(error.errors[0].path).toBe('username');
    expect(error.errors[0].message).toBe('Validator "required" failed for path username');
    expect(error.errors[1].path).toBe('password');
    expect(error.errors[1].message).toBe('Validator "required" failed for path password');
  });

  it('should create new ApiError based on MongoError', function () {
    var err =
    { name: "MongoError",
      message: "E11000 duplicate key error index: medinfo.users.$UserName_1  dup key: { : \"ann\" }",
      code: 11000
    };
    var error = new ApiError(err, 404, 'Record not found');
    expect(error.message).toBe("Not unique value 'ann' for field 'UserName'");
    expect(error.code).toBe(400);
    expect(error.moreInfo).toBe('http://localhost:3000/api/v0/docs/errors/400');
  });

  it('should create new ApiError based on error', function () {
    var error = new ApiError({}, 404, 'Record not found');
    expect(error.message).toBe('Internal server error');
    expect(error.code).toBe(500);
    expect(error.moreInfo).toBe('http://localhost:3000/api/v0/docs/errors/500');
  });

  it('should create new ApiError based on code and message', function () {
    var error = new ApiError(null, 404, 'Record not found');
    expect(error.message).toBe('Record not found');
    expect(error.code).toBe(404);
    expect(error.moreInfo).toBe('http://localhost:3000/api/v0/docs/errors/404');
  });
});