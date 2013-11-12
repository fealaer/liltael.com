'use strict';

var rekuire = require('rekuire'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should(),
    ApiResponse = rekuire('server/helpers/api/v0/response'),
    ApiStatus = rekuire('server/helpers/api/v0/status'),
    ApiError = rekuire('server/helpers/api/v0/error');

chai.Assertion.includeStack = true;

describe('REST API v0 method', function () {
  var rest, req, res, next;

  beforeEach(function () {
    rest = rekuire('server/controllers/api/v0/rest')(TestModel);
    res = new Response();
  });

  describe('Get:', function () {
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

  describe('Post:', function () {
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

  describe('Get by Id:', function () {

    beforeEach(function () {
      rest = rekuire('server/controllers/api/v0/rest')(TestModel);
      res = new Response();
    });

    it('should respond with "Incorrect record ID" error', function () {
      var params = {id: "abba"};
      req = new Request(null, params);
      rest.getById(req, res, next);
      res.result.should.have.property('status', ApiStatus.S400);
      res.result.should.have.property('error');
      res.result.error.should.have.property('message', 'Incorrect record ID');
      res.result.error.should.have.property('code', 400);
      res.result.error.should.have.property('moreInfo', 'http://localhost:3000/api/v0/docs/errors/400');
      res.result.should.have.property('result').with.be.empty;
    });

    it('should respond with DB error', function () {
      TestModel.findById = function (id, callback) {
        callback({message: 'some error'});
      };
      var params = {id: "5260001073657b99d0000001"};
      req = new Request(null, params);
      rest.getById(req, res, next);
      res.result.should.have.property('status', ApiStatus.S500);
      res.result.should.have.property('error');
      res.result.error.should.have.property('message', 'Internal server error');
      res.result.error.should.have.property('code', 500);
      res.result.error.should.have.property('moreInfo', 'http://localhost:3000/api/v0/docs/errors/500');
      res.result.should.have.property('result').with.be.empty;
    });

    it('should respond with "Record not found" error', function () {
      TestModel.findById = function (id, callback) {
        callback(null, null);
      };
      var params = {id: "5260001073657b99d0000001"};
      req = new Request(null, params);
      rest.getById(req, res, next);
      res.result.should.have.property('status', ApiStatus.S404);
      res.result.should.have.property('error');
      res.result.error.should.have.property('message', 'Record not found');
      res.result.error.should.have.property('code', 404);
      res.result.error.should.have.property('moreInfo', 'http://localhost:3000/api/v0/docs/errors/404');
      res.result.should.have.property('result').with.be.empty;
    });

    it('should find and return a single document in a collection by its id', function () {
      TestModel.findById = function (id, callback) {
        callback(null, data);
      };
      var data = {_id: "5260001073657b99d0000001", name: "test", fake: true};
      var params = {id: "5260001073657b99d0000001"};
      req = new Request(null, params);
      rest.getById(req, res, next);
      res.result.should.have.property('status', ApiStatus.S200);
      res.result.should.have.property('result', data);
      res.result.should.have.property('error').with.be.empty;
    });
  });

  describe('Delete by Id:', function () {

    beforeEach(function () {
      rest = rekuire('server/controllers/api/v0/rest')(TestModel);
      res = new Response();
    });

    it('should respond with "Incorrect record ID" error', function () {
      var data = {id: "abba"};
      req = new Request(data);
      rest.deleteById(req, res, next);
      res.result.should.have.property('status', ApiStatus.S400);
      res.result.should.have.property('error');
      res.result.error.should.have.property('message', 'Incorrect record ID');
      res.result.error.should.have.property('code', 400);
      res.result.error.should.have.property('moreInfo', 'http://localhost:3000/api/v0/docs/errors/400');
      res.result.should.have.property('result').with.be.empty;
    });

    it('should respond with DB error', function () {
      TestModel.remove = function (id, callback) {
        callback({message: 'some error'});
      };
      var data = {id: "5260001073657b99d0000001"};
      req = new Request(data);
      rest.deleteById(req, res, next);
      res.result.should.have.property('status', ApiStatus.S500);
      res.result.should.have.property('error');
      res.result.error.should.have.property('message', 'Internal server error');
      res.result.error.should.have.property('code', 500);
      res.result.error.should.have.property('moreInfo', 'http://localhost:3000/api/v0/docs/errors/500');
      res.result.should.have.property('result').with.be.empty;
    });

    it('should respond with "Record does not exist" error', function () {
      TestModel.remove = function (id, callback) {
        callback(null, 0);
      };
      var data = {id: "5260001073657b99d0000001"};
      req = new Request(data);
      rest.deleteById(req, res, next);
      res.result.should.have.property('status', ApiStatus.S404);
      res.result.should.have.property('error');
      res.result.error.should.have.property('message', 'Record does not exist');
      res.result.error.should.have.property('code', 404);
      res.result.error.should.have.property('moreInfo', 'http://localhost:3000/api/v0/docs/errors/404');
      res.result.should.have.property('result').with.be.empty;
    });

    it('should remove a single document in a collection and return that only one document affected', function () {
      TestModel.remove = function (id, callback) {
        callback(null, 1);
      };
      var data = {id: "5260001073657b99d0000001"};
      req = new Request(data);
      rest.deleteById(req, res, next);
      res.result.should.have.property('status', ApiStatus.S200);
      res.result.should.have.property('result');
      res.result.result.should.have.property('recordsAffected', 1);
      res.result.should.have.property('error').with.be.empty;
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

function Request(data, params) {
  this.body = {};
  this.body.data = data;
  this.params = params;
}

Request.prototype.name = "Request";