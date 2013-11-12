'use strict';

var rekuire = require('rekuire'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    ApiResponse = rekuire('server/helpers/api/v0/response'),
    ApiStatus = rekuire('server/helpers/api/v0/status'),
    ApiError = rekuire('server/helpers/api/v0/error');

chai.Assertion.includeStack = true;

describe('REST API V0 method', function () {

  var rest, restErr, req, res, next;

  beforeEach(function () {
    rest = rekuire('server/controllers/api/v0/rest')(TestModel);
    res = new Response();
  });

  describe('GET:', function () {
    it('should respond with all test records', function () {
      var records = [1, 2];
      TestModel.find = function (query, callback) {
        callback(null, records);
      };
      rest.get(req, res, next);
      res.result.should.have.property('result', records);
      res.result.should.have.property('status', ApiStatus.S200);
      res.result.should.have.property('error').with.be.empty;
    });

    it('should respond with error', function () {
      TestModel.find = function (query, callback) {
        var error = new Error(500, 'Internal server error');
        callback(error, null);
      };
      rest.get(req, res, next);
      res.result.should.have.property('result').with.be.empty;
      res.result.should.have.property('status', ApiStatus.S500);
      res.result.should.have.property('error');
      res.result.error.should.have.property('message', 'Internal server error');
      res.result.error.should.have.property('code', 500);
      res.result.error.should.have.property('moreInfo', 'http://localhost:3000/api/v0/docs/errors/500');
    });
  });

  describe('POST:', function () {
    it('should respond with created record and remove _id before save', function () {
      TestModel.prototype.validate = function (callback) {
        callback(null);
      };

      TestModel.prototype.save = function (callback) {
        callback(null);
      };
      var data = {_id: "5260001073657b99d0000001", name: "test", fake: true};
      req = new Request(data);
      rest.post(req, res, next);
      res.result.should.have.property('result');
      res.result.result.data.should.have.property('name', "test");
      res.result.result.data.should.have.property('fake', true);
      res.result.result.data.should.not.have.property('_id');
      res.result.should.have.property('status', ApiStatus.S200);
      res.result.should.have.property('error').with.be.empty;
    });

    it('should respond with save error', function () {
      TestModel.prototype.validate = function (callback) {
        callback(null);
      };
      TestModel.prototype.save = function (callback) {
        callback({message: 'some error'});
      };
      rest = rekuire('server/controllers/api/v0/rest')(TestModel);
      var data = {_id: "5260001073657b99d0000001", name: "test", fake: true};
      req = new Request(data);
      rest.post(req, res, next);
      res.result.should.have.property('status', ApiStatus.S500);
      res.result.should.have.property('error');
      res.result.error.should.have.property('message', 'Internal server error');
      res.result.error.should.have.property('code', 500);
      res.result.error.should.have.property('moreInfo', 'http://localhost:3000/api/v0/docs/errors/500');
      res.result.should.have.property('result').with.be.empty;
    });

    it('should respond with validation error', function () {
      TestModel.prototype.validate = function (callback) {
        callback({ message: 'Validation failed',
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
        });
      };
      TestModel.prototype.save = function (callback) {
        callback(null);
      };
      rest = rekuire('server/controllers/api/v0/rest')(TestModel);
      var data = {_id: "5260001073657b99d0000001", name: "test", fake: true};
      req = new Request(data);
      rest.post(req, res, next);
      res.result.should.have.property('status', ApiStatus.S400);
      res.result.should.have.property('error');
      res.result.error.should.have.property('message', 'Validation failed');
      res.result.error.should.have.property('code', 400);
      res.result.error.should.have.property('moreInfo', 'http://localhost:3000/api/v0/docs/errors/400');
      res.result.error.should.have.property('errors').with.length(2);
      res.result.error.errors[0].should.have.property('path', 'username');
      res.result.error.errors[0].should.have.property('message', 'Validator "required" failed for path username');
      res.result.error.errors[1].should.have.property('path', 'password');
      res.result.error.errors[1].should.have.property('message', 'Validator "required" failed for path password');
      res.result.should.have.property('result').with.be.empty;
    });
  });
});

function TestModel(data) {
  this.data = data;
}

TestModel.prototype.name = "TestModel";

function Response() {
  this.result = null;
  this.json = function (result) {
    this.result = result;
  }
}

Response.prototype.name = "Response";

function Request(data) {
  this.body = {};
  this.body.data = data;
}

Request.prototype.name = "Request";