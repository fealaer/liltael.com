var ObjectID = require('mongodb').ObjectID;
var JsonResponse = require('../../../helpers/json/response');
var JsonError = require('../../../helpers/json/error');

module.exports = function (Model) {
  return new RestApi(Model);
};

function RestApi(Model) {
  this.Model = Model;

  this.get = function (req, res, next) {
    Model.find({}, function (err, records) {
      if (err) {
        res.json(new JsonResponse(new JsonError(err), null));
      } else {
        res.json(new JsonResponse(null, records));
      }
    });
  };

  this.getById = function (req, res, next) {
    validateObjectId(req.params.id, function (err, _id) {
      if (err) {
        res.json(new JsonResponse(err, null));
      } else {
        Model.findById(_id, function (err, record) {
          if (err) {
            res.json(new JsonResponse(new JsonError(err), null));
          } else {
            if (!record) {
              res.json(new JsonResponse(new JsonError(null, 404, 'Record not found'), null));
            } else {
              res.json(new JsonResponse(null, record));
            }
          }
        });
      }
    });
  };

  this.post = function (req, res, next) {
    var rawData = req.body.data || req.body;
    delete rawData._id;
    var newModel = new Model(rawData);
    newModel.validate(function (err) {
      if (err) {
        res.json(new JsonResponse(new JsonError(err), null));
      } else {
        newModel.save(function (err) {
          if (err) {
            res.json(new JsonResponse(new JsonError(err), null));
          } else {
            res.json(new JsonResponse(null, newModel));
          }
        });
      }
    });
  };

  this.putById = function (req, res, next) {
    var rawData = req.body.data || req.body;
    validateObjectId(rawData.id, function (err, _id) {
      if (err) {
        res.json(new JsonResponse(err, null));
      } else {
        delete rawData._id;
        Model.update({"_id": _id}, rawData, {upsert: true}, function (err, affected) {
          if (err) {
            res.json(new JsonResponse(new JsonError(err), null));
          } else {
            if (affected < 1) {
              res.json(new JsonResponse(new JsonError(null, 404, 'Record does not exist'), null));
            } else {
              res.json(new JsonResponse(null, {recordsAffected: affected}));
            }
          }
        });
      }
    });
  };

  this.deleteById = function (req, res, next) {
    var rawData = req.body.data || req.body;
    validateObjectId(rawData.id, function (err, _id) {
      if (err) {
        res.json(new JsonResponse(err, null));
      } else {
        Model.remove({"_id": _id}, function (err, affected) {
          if (err) {
            res.json(new JsonResponse(new JsonError(err), null));
          } else {
            if (affected < 1) {
              res.json(new JsonResponse(new JsonError(null, 404, 'Record does not exist'), null));
            } else {
              res.json(new JsonResponse(null, {recordsAffected: affected}));
            }
          }
        });
      }
    });
  };
}

function validateObjectId(id, callback) {
  try {
    var _id = new ObjectID(id);
    callback(null, _id);
  } catch (e) {
    callback(new JsonError(null, 400, 'Incorrect record ID'), null);
  }
}

RestApi.prototype.name = "RestApi";