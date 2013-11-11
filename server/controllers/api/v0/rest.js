var ObjectID = require('mongodb').ObjectID;
var ApiResponse = require('../../../helpers/api/v0/response');
var ApiError = require('../../../helpers/api/v0/error');

module.exports = function (Model) {
  return new RestApi(Model);
};

function RestApi(Model) {
  this.Model = Model;

  this.get = function (req, res, next) {
    Model.find({}, function (err, records) {
      if (err) {
        res.json(new ApiResponse(new ApiError(err), null));
      } else {
        res.json(new ApiResponse(null, records));
      }
    });
  };

  this.getById = function (req, res, next) {
    validateObjectId(req.params.id, function (err, id) {
      if (err) {
        res.json(new ApiResponse(err, null));
      } else {
        Model.findById(_id, function (err, record) {
          if (err) {
            res.json(new ApiResponse(new ApiError(err), null));
          } else {
            if (!record) {
              res.json(new ApiResponse(new ApiError(null, 404, 'Record not found'), null));
            } else {
              res.json(new ApiResponse(null, record));
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
        res.json(new ApiResponse(new ApiError(err), null));
      } else {
        newModel.save(function (err) {
          if (err) {
            res.json(new ApiResponse(new ApiError(err), null));
          } else {
            res.json(new ApiResponse(null, newModel));
          }
        });
      }
    });
  };

  this.putById = function (req, res, next) {
    var rawData = req.body.data || req.body;
    validateObjectId(rawData.id, function (err, id) {
      if (err) {
        res.json(new ApiResponse(err, null));
      } else {
        delete rawData._id;
        Model.update({"_id": _id}, rawData, {upsert: true}, function (err, record) {
          if (err) {
            res.json(new ApiResponse(new ApiError(err), null));
          } else {
            if (record < 1) {
              res.json(new ApiResponse(new ApiError(null, 404, 'Record does not exist'), null));
            } else {
              res.json(new ApiResponse(null, {"recordsAffected": record}));
            }
          }
        });
      }
    });
  };

  this.deleteById = function (req, res, next) {
    var rawData = req.body.data || req.body;
    validateObjectId(rawData.id, function (err, id) {
      if (err) {
        res.json(new ApiResponse(err, null));
      } else {
        Model.remove({"_id": id}, function (err, record) {
          if (err) {
            res.json(new ApiResponse(new ApiError(err), null));
          } else {
            if (record < 1) {
              res.json(new ApiResponse(new ApiError(null, 404, 'Record does not exist'), null));
            } else {
              res.json(new ApiResponse(null, {"recordsAffected": record}));
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
  } catch (e) {
    callback(new ApiError(null, 400, 'Incorrect record ID'), null);
  }
  callback(null, _id);
}

RestApi.prototype.name = "RestApi";