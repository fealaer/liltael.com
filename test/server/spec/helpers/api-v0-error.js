'use strict';

var rekuire = require('rekuire'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should();
chai.Assertion.includeStack = true;

var ApiError = rekuire('server/helpers/api/v0/error');

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
    error.should.have.property('message', 'Validation failed');
    error.should.have.property('code', 400);
    error.should.have.property('moreInfo', 'http://localhost:3000/api/v0/docs/errors/400');
    error.should.have.property('errors').with.length(2);
    error.errors[0].should.have.property('path', 'username');
    error.errors[0].should.have.property('message', 'Validator "required" failed for path username');
    error.errors[1].should.have.property('path', 'password');
    error.errors[1].should.have.property('message', 'Validator "required" failed for path password');
  });

  it('should create new ApiError based on MongoError', function () {
    var err =
    { name: "MongoError",
      message: "E11000 duplicate key error index: medinfo.users.$UserName_1  dup key: { : \"ann\" }",
      code: 11000
    };
    var error = new ApiError(err, 404, 'Record not found');
    error.should.have.property('message', "Not unique value 'ann' for field 'UserName'");
    error.should.have.property('code', 400);
    error.should.have.property('moreInfo', 'http://localhost:3000/api/v0/docs/errors/400');
  });

  it('should create new ApiError based on error', function () {
    var error = new ApiError({}, 404, 'Record not found');
    error.should.have.property('message', 'Internal server error');
    error.should.have.property('code', 500);
    error.should.have.property('moreInfo', 'http://localhost:3000/api/v0/docs/errors/500');
  });

  it('should create new ApiError based on code and message', function () {
    var error = new ApiError(null, 404, 'Record not found');
    error.should.have.property('message', 'Record not found');
    error.should.have.property('code', 404);
    error.should.have.property('moreInfo', 'http://localhost:3000/api/v0/docs/errors/404');
  });
});