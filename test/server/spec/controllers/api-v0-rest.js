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
      res.result.should.have.property('result').with.length(2);
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