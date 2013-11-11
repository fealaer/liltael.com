'use strict';

var rekuire = require('rekuire'),
    chai = require('chai'),
    expect = chai.expect,
    should = chai.should();
chai.Assertion.includeStack = true;

describe('API V0: rest', function () {

  var rest, req, res, next;

  beforeEach(function () {
    rest = rekuire('server/controllers/api/v0/rest')(TestModel);
    res = new Response();
  });

  describe('REST: GET', function () {
    it('should respond on GET method with all test records', function () {
      var records = [1, 2];
      TestModel.find = function (query, callback) {
        callback(null, records);
      };
      rest.get(req, res, next);
      res.result.should.have.property('result').with.eql(records);
      res.result.should.have.property('status').with.eql({code: 200, name: 'OK'});
      res.result.should.have.property('error').with.be.empty;
    });

    it('should respond with error on GET method', function () {
      TestModel.find = function (query, callback) {
        var error = new Error(500, 'Internal server error');
        callback(error, null);
      };
      rest.get(req, res, next);
      res.result.should.have.property('result').with.be.empty;
      res.result.should.have.property('status').with.eql({code: 500, name: 'Internal server error'});
      res.result.should.have.property('error');
      res.result.error.should.have.property('message').with.equal('Internal server error');
      res.result.error.should.have.property('code').with.equal(500);
      res.result.error.should.have.property('moreInfo').with.equal('http://localhost:3000/api/v0/docs/errors/500');
    });
  });
});

function TestModel() {
}

TestModel.prototype.name = "TestModel";

function Response() {
  this.result = null;
  this.json = function (result) {
    this.result = result;
  }
}

Response.prototype.name = "Response";