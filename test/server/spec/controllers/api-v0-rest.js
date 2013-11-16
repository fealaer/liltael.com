'use strict';

var rekuire = require('rekuire'),
    ApiResponse = rekuire('server/helpers/api/v0/response'),
    ApiStatus = rekuire('server/helpers/api/v0/status'),
    ApiError = rekuire('server/helpers/api/v0/error');

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
      expect(res.result.result).toBe(records);
      expect(res.result.status).toBe(ApiStatus.S200);
      expect(Object.keys(res.result.error).length === 0).toBe(true);
    });

    it('should respond with error', function () {
      TestModel.find = function (query, callback) {
        var error = new Error(500, 'Internal server error');
        callback(error, null);
      };
      rest.get(req, res, next);
      expect(Object.keys(res.result.result).length === 0).toBe(true);
      expect(res.result.status).toBe(ApiStatus.S500);
      expect(res.result.error).not.toBeUndefined();
      expect(res.result.error.message).toBe('Internal server error');
      expect(res.result.error.code).toBe(500);
      expect(res.result.error.moreInfo).toBe('http://localhost:3000/api/v0/docs/errors/500');
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
      expect(res.result.result.data.name).toBe("test");
      expect(res.result.result.data.fake).toBe(true);
      expect(res.result.result.data._id).toBeUndefined();
      expect(res.result.status).toBe(ApiStatus.S200);
      expect(Object.keys(res.result.error).length === 0).toBe(true);
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
      expect(res.result.status).toBe(ApiStatus.S500);
      expect(res.result.error).not.toBeUndefined();
      expect(res.result.error.message).toBe('Internal server error');
      expect(res.result.error.code).toBe(500);
      expect(res.result.error.moreInfo).toBe('http://localhost:3000/api/v0/docs/errors/500');
      expect(Object.keys(res.result.result).length === 0).toBe(true);
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
      expect(res.result.status).toBe(ApiStatus.S400);
      expect(res.result.error).not.toBeUndefined();
      expect(res.result.error.message).toBe('Validation failed');
      expect(res.result.error.code).toBe(400);
      expect(res.result.error.moreInfo).toBe('http://localhost:3000/api/v0/docs/errors/400');
      expect(res.result.error.errors.length).toBe(2);
      expect(res.result.error.errors[0].path).toBe('username');
      expect(res.result.error.errors[0].message).toBe('Validator "required" failed for path username');
      expect(res.result.error.errors[1].path).toBe('password');
      expect(res.result.error.errors[1].message).toBe('Validator "required" failed for path password');
      expect(Object.keys(res.result.result).length === 0).toBe(true);
    });
  });

  describe('Get by Id:', function () {
    it('should respond with "Incorrect record ID" error', function () {
      var params = {id: "abba"};
      req = new Request(null, params);
      rest.getById(req, res, next);
      expect(res.result.status).toBe(ApiStatus.S400);
      expect(res.result.error).not.toBeUndefined();
      expect(res.result.error.message).toBe('Incorrect record ID');
      expect(res.result.error.code).toBe(400);
      expect(res.result.error.moreInfo).toBe('http://localhost:3000/api/v0/docs/errors/400');
      expect(Object.keys(res.result.result).length === 0).toBe(true);
    });

    it('should respond with DB error', function () {
      TestModel.findById = function (id, callback) {
        callback({message: 'some error'});
      };
      var params = {id: "5260001073657b99d0000001"};
      req = new Request(null, params);
      rest.getById(req, res, next);
      expect(res.result.status).toBe(ApiStatus.S500);
      expect(res.result.error).not.toBeUndefined();
      expect(res.result.error.message).toBe('Internal server error');
      expect(res.result.error.code).toBe(500);
      expect(res.result.error.moreInfo).toBe('http://localhost:3000/api/v0/docs/errors/500');
      expect(Object.keys(res.result.result).length === 0).toBe(true);
    });

    it('should respond with "Record not found" error', function () {
      TestModel.findById = function (id, callback) {
        callback(null, null);
      };
      var params = {id: "5260001073657b99d0000001"};
      req = new Request(null, params);
      rest.getById(req, res, next);
      expect(res.result.status).toBe(ApiStatus.S404);
      expect(res.result.error).not.toBeUndefined();
      expect(res.result.error.message).toBe('Record not found');
      expect(res.result.error.code).toBe(404);
      expect(res.result.error.moreInfo).toBe('http://localhost:3000/api/v0/docs/errors/404');
      expect(Object.keys(res.result.result).length === 0).toBe(true);
    });

    it('should find and return a single document in a collection by its id', function () {
      TestModel.findById = function (id, callback) {
        callback(null, data);
      };
      var data = {_id: "5260001073657b99d0000001", name: "test", fake: true};
      var params = {id: "5260001073657b99d0000001"};
      req = new Request(null, params);
      rest.getById(req, res, next);
      expect(res.result.status).toBe(ApiStatus.S200);
      expect(res.result.result).toBe(data);
      expect(Object.keys(res.result.error).length === 0).toBe(true);
    });
  });

  describe('Delete by Id:', function () {
    it('should respond with "Incorrect record ID" error', function () {
      var data = {id: "abba"};
      req = new Request(data);
      rest.deleteById(req, res, next);
      expect(res.result.status).toBe(ApiStatus.S400);
      expect(res.result.error).not.toBeUndefined();
      expect(res.result.error.message).toBe('Incorrect record ID');
      expect(res.result.error.code).toBe(400);
      expect(res.result.error.moreInfo).toBe('http://localhost:3000/api/v0/docs/errors/400');
      expect(Object.keys(res.result.result).length === 0).toBe(true);
    });

    it('should respond with DB error', function () {
      TestModel.remove = function (id, callback) {
        callback({message: 'some error'});
      };
      var data = {id: "5260001073657b99d0000001"};
      req = new Request(data);
      rest.deleteById(req, res, next);
      expect(res.result.status).toBe(ApiStatus.S500);
      expect(res.result.error).not.toBeUndefined();
      expect(res.result.error.message).toBe('Internal server error');
      expect(res.result.error.code).toBe(500);
      expect(res.result.error.moreInfo).toBe('http://localhost:3000/api/v0/docs/errors/500');
      expect(Object.keys(res.result.result).length === 0).toBe(true);
    });

    it('should respond with "Record does not exist" error', function () {
      TestModel.remove = function (id, callback) {
        callback(null, 0);
      };
      var data = {id: "5260001073657b99d0000001"};
      req = new Request(data);
      rest.deleteById(req, res, next);
      expect(res.result.status).toBe(ApiStatus.S404);
      expect(res.result.error).not.toBeUndefined();
      expect(res.result.error.message).toBe('Record does not exist');
      expect(res.result.error.code).toBe(404);
      expect(res.result.error.moreInfo).toBe('http://localhost:3000/api/v0/docs/errors/404');
      expect(Object.keys(res.result.result).length === 0).toBe(true);
    });

    it('should remove a single document in a collection and return that only one document affected', function () {
      TestModel.remove = function (id, callback) {
        callback(null, 1);
      };
      var data = {id: "5260001073657b99d0000001"};
      req = new Request(data);
      rest.deleteById(req, res, next);
      expect(res.result.status).toBe(ApiStatus.S200);
      expect(res.result.result).not.toBeUndefined();
      expect(res.result.result.recordsAffected).toBe(1);
      expect(Object.keys(res.result.error).length === 0).toBe(true);
    });
  });

  describe('Put by Id:', function () {
    it('should respond with "Incorrect record ID" error', function () {
      var data = {id: "abba"};
      req = new Request(data);
      rest.putById(req, res, next);
      expect(res.result.status).toBe(ApiStatus.S400);
      expect(res.result.error).not.toBeUndefined();
      expect(res.result.error.message).toBe('Incorrect record ID');
      expect(res.result.error.code).toBe(400);
      expect(res.result.error.moreInfo).toBe('http://localhost:3000/api/v0/docs/errors/400');
      expect(Object.keys(res.result.result).length === 0).toBe(true);
    });

    it('should respond with DB error', function () {
      TestModel.update = function (conditions, update, options, callback) {
        callback({message: 'some error'});
      };
      var data = {id: "5260001073657b99d0000001"};
      req = new Request(data);
      rest.putById(req, res, next);
      expect(res.result.status).toBe(ApiStatus.S500);
      expect(res.result.error).not.toBeUndefined();
      expect(res.result.error.message).toBe('Internal server error');
      expect(res.result.error.code).toBe(500);
      expect(res.result.error.moreInfo).toBe('http://localhost:3000/api/v0/docs/errors/500');
      expect(Object.keys(res.result.result).length === 0).toBe(true);
    });

    it('should respond with "Record does not exist" error', function () {
      TestModel.update = function (conditions, update, options, callback) {
        callback(null, 0);
      };
      var data = {id: "5260001073657b99d0000001"};
      req = new Request(data);
      rest.putById(req, res, next);
      expect(res.result.status).toBe(ApiStatus.S404);
      expect(res.result.error).not.toBeUndefined();
      expect(res.result.error.message).toBe('Record does not exist');
      expect(res.result.error.code).toBe(404);
      expect(res.result.error.moreInfo).toBe('http://localhost:3000/api/v0/docs/errors/404');
      expect(Object.keys(res.result.result).length === 0).toBe(true);
    });

    it('should update a single document in a collection and return that only one document affected', function () {
      TestModel.update = function (conditions, update, options, callback) {
        expect(Object.keys(conditions._id).length !== 0).toBe(true);
        expect(update.newField).toBe('newField');
        expect(options.upsert).toBe(true);
        callback(null, 1);
      };
      var data = {id: "5260001073657b99d0000001", newField: "newField"};
      req = new Request(data);
      rest.putById(req, res, next);
      expect(res.result.status).toBe(ApiStatus.S200);
      expect(res.result.result).not.toBeUndefined();
      expect(res.result.result.recordsAffected).toBe(1);
      expect(Object.keys(res.result.error).length === 0).toBe(true);
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