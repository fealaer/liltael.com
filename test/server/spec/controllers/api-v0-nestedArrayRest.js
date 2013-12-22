'use strict';

var JsonResponse = require('../../../../server/helpers/json/response'),
    Status = require('../../../../server/helpers/json/status'),
    Response = require('../../mock/response'),
    Request = require('../../mock/request'),
    expect = require('expect.js');

describe('Nested Array REST API v0 method', function () {
  var nestedArrayRest, req, res, next;

  beforeEach(function () {
    nestedArrayRest = require('../../../../server/controllers/api/v0/nestedArrayRest')(TestModel, "tests");
    res = new Response();
  });

  describe('Get:', function () {
    var params;
    beforeEach(function () {
      params = {id: '5260001073657b99d0000001'};
    });

    it('should respond with \'Incorrect record ID\' error', function () {
      params = {id: 'abba'};
      req = new Request(null, params);
      nestedArrayRest.get(req, res, next);
      expect(res.result.status).to.be(Status.S400);
      expect(res.result.error).not.to.be(undefined);
      expect(res.result.error.message).to.be('Incorrect record ID');
      expect(res.result.error.code).to.be(400);
      expect(res.result.error.moreInfo).to.be('http://localhost:3000/api/docs/errors/400');
      expect(Object.keys(res.result.result).length === 0).to.be(true);
    });

    it('should respond with DB error', function () {
      TestModel.findById = function (id, project, callback) {
        callback({message: 'some error'});
      };
      req = new Request(null, params);
      nestedArrayRest.get(req, res, next);
      expect(res.result.status).to.be(Status.S500);
      expect(res.result.error).not.to.be(undefined);
      expect(res.result.error.message).to.be('Internal server error');
      expect(res.result.error.code).to.be(500);
      expect(res.result.error.moreInfo).to.be('http://localhost:3000/api/docs/errors/500');
      expect(Object.keys(res.result.result).length === 0).to.be(true);
    });

    it('should respond with \'Record not found\' error', function () {
      TestModel.findById = function (id, project, callback) {
        callback(null, null);
      };
      req = new Request(null, params);
      nestedArrayRest.get(req, res, next);
      expect(res.result.status).to.be(Status.S404);
      expect(res.result.error).not.to.be(undefined);
      expect(res.result.error.message).to.be('Record not found');
      expect(res.result.error.code).to.be(404);
      expect(res.result.error.moreInfo).to.be('http://localhost:3000/api/docs/errors/404');
      expect(Object.keys(res.result.result).length === 0).to.be(true);
    });

    it('should find a record in collection by its id and return array', function () {
      var data = {quotes: ["I know kung fu.", "My name... is Neo."]};
      TestModel.findById = function (id, project, callback) {
        callback(null, data);
      };
      req = new Request(null, params);
      nestedArrayRest.get(req, res, next);
      expect(res.result.status).to.be(Status.S200);
      expect(res.result.result).to.be(data);
      expect(Object.keys(res.result.error).length === 0).to.be(true);
    });
  });

  describe('Post:', function () {

    var params, data;
    beforeEach(function() {
      params = {id: '5260001073657b99d0000001'};
      data = {tests: 'newValue'};
    });

    it('should respond with \'Incorrect record ID\' error', function () {
      params = {id: 'abba'};
      req = new Request(null, params);
      nestedArrayRest.post(req, res, next);
      expect(res.result.status).to.be(Status.S400);
      expect(res.result.error).not.to.be(undefined);
      expect(res.result.error.message).to.be('Incorrect record ID');
      expect(res.result.error.code).to.be(400);
      expect(res.result.error.moreInfo).to.be('http://localhost:3000/api/docs/errors/400');
      expect(Object.keys(res.result.result).length === 0).to.be(true);
    });

    it('should respond with save error', function () {
      TestModel.update = function (conditions, update, callback) {
        callback({message: 'some error'});
      };
      req = new Request(data, params);
      nestedArrayRest.post(req, res, next);
      expect(res.result.status).to.be(Status.S500);
      expect(res.result.error).not.to.be(undefined);
      expect(res.result.error.message).to.be('Internal server error');
      expect(res.result.error.code).to.be(500);
      expect(res.result.error.moreInfo).to.be('http://localhost:3000/api/docs/errors/500');
      expect(Object.keys(res.result.result).length === 0).to.be(true);
    });

    it('should add 1 element to array and respond with number of affected records', function () {
      TestModel.update = function (conditions, update, callback) {
        expect(Object.keys(conditions._id).length !== 0).to.be(true);
        expect(update.$push).to.eql({'tests': data.tests});
        callback(null, 1);
      };
      req = new Request(data, params);
      nestedArrayRest.post(req, res, next);
      expect(res.result.status).to.be(Status.S200);
      expect(res.result.result.recordsAffected).to.be(1);
      expect(Object.keys(res.result.error).length === 0).to.be(true);
    });
  });

  describe('Put:', function () {

    var params, data;
    beforeEach(function() {
      params = {id: '5260001073657b99d0000001'};
      data = {oldValue: "value", tests: 'newValue'};
    });

    it('should respond with \'Incorrect record ID\' error', function () {
      params = {id: 'abba'};
      req = new Request(null, params);
      nestedArrayRest.put(req, res, next);
      expect(res.result.status).to.be(Status.S400);
      expect(res.result.error).not.to.be(undefined);
      expect(res.result.error.message).to.be('Incorrect record ID');
      expect(res.result.error.code).to.be(400);
      expect(res.result.error.moreInfo).to.be('http://localhost:3000/api/docs/errors/400');
      expect(Object.keys(res.result.result).length === 0).to.be(true);
    });

    it('should respond with DB error', function () {
      TestModel.update = function (conditions, update, callback) {
        callback({message: 'some error'});
      };
      req = new Request(data, params);
      nestedArrayRest.put(req, res, next);
      expect(res.result.status).to.be(Status.S500);
      expect(res.result.error).not.to.be(undefined);
      expect(res.result.error.message).to.be('Internal server error');
      expect(res.result.error.code).to.be(500);
      expect(res.result.error.moreInfo).to.be('http://localhost:3000/api/docs/errors/500');
      expect(Object.keys(res.result.result).length === 0).to.be(true);
    });

    it('should respond with \'Record does not exist\' error', function () {
      TestModel.update = function (conditions, update, callback) {
        callback(null, 0);
      };
      req = new Request(data, params);
      nestedArrayRest.put(req, res, next);
      expect(res.result.status).to.be(Status.S404);
      expect(res.result.error).not.to.be(undefined);
      expect(res.result.error.message).to.be('Record does not exist');
      expect(res.result.error.code).to.be(404);
      expect(res.result.error.moreInfo).to.be('http://localhost:3000/api/docs/errors/404');
      expect(Object.keys(res.result.result).length === 0).to.be(true);
    });

    it('should update a single document in a collection and return that only one document affected', function () {
      TestModel.update = function (conditions, update, callback) {
        expect(Object.keys(conditions._id).length !== 0).to.be(true);
        expect(conditions.tests).to.be(data.oldValue);
        expect(update.$set).to.eql({'tests.$': data.tests});
        callback(null, 1);
      };
      req = new Request(data, params);
      nestedArrayRest.put(req, res, next);
      expect(res.result.status).to.be(Status.S200);
      expect(res.result.result).not.to.be(undefined);
      expect(res.result.result.recordsAffected).to.be(1);
      expect(Object.keys(res.result.error).length === 0).to.be(true);
    });
  });

  describe('Delete:', function () {

    var params, data;
    beforeEach(function() {
      params = {id: '5260001073657b99d0000001'};
      data = {tests: 'oldValue'};
    });

    it('should respond with \'Incorrect record ID\' error', function () {
      params = {id: 'abba'};
      req = new Request(null, params);
      nestedArrayRest.delete(req, res, next);
      expect(res.result.status).to.be(Status.S400);
      expect(res.result.error).not.to.be(undefined);
      expect(res.result.error.message).to.be('Incorrect record ID');
      expect(res.result.error.code).to.be(400);
      expect(res.result.error.moreInfo).to.be('http://localhost:3000/api/docs/errors/400');
      expect(Object.keys(res.result.result).length === 0).to.be(true);
    });

    it('should respond with DB error', function () {
      TestModel.update = function (conditions, update, callback) {
        callback({message: 'some error'});
      };
      req = new Request(data, params);
      nestedArrayRest.delete(req, res, next);
      expect(res.result.status).to.be(Status.S500);
      expect(res.result.error).not.to.be(undefined);
      expect(res.result.error.message).to.be('Internal server error');
      expect(res.result.error.code).to.be(500);
      expect(res.result.error.moreInfo).to.be('http://localhost:3000/api/docs/errors/500');
      expect(Object.keys(res.result.result).length === 0).to.be(true);
    });

    it('should respond with \'Record does not exist\' error', function () {
      TestModel.update = function (conditions, update, callback) {
        callback(null, 0);
      };
      req = new Request(data, params);
      nestedArrayRest.delete(req, res, next);
      expect(res.result.status).to.be(Status.S404);
      expect(res.result.error).not.to.be(undefined);
      expect(res.result.error.message).to.be('Record does not exist');
      expect(res.result.error.code).to.be(404);
      expect(res.result.error.moreInfo).to.be('http://localhost:3000/api/docs/errors/404');
      expect(Object.keys(res.result.result).length === 0).to.be(true);
    });

    it('should remove a single document in a collection and return that only one document affected', function () {
      TestModel.update = function (conditions, update, callback) {
        expect(Object.keys(conditions._id).length !== 0).to.be(true);
        expect(update.$pull).to.eql({'tests': data.tests});
        callback(null, 1);
      };
      req = new Request(data, params);
      nestedArrayRest.delete(req, res, next);
      expect(res.result.status).to.be(Status.S200);
      expect(res.result.result).not.to.be(undefined);
      expect(res.result.result.recordsAffected).to.be(1);
      expect(Object.keys(res.result.error).length === 0).to.be(true);
    });
  });
});

function TestModel(data) {
  this.data = data;
}

TestModel.prototype.name = 'TestModel';