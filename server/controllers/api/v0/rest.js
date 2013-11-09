var User = require('models/user').User;
var ObjectID = require('mongodb').ObjectID;
var ApiResponse = require('helpers/api/v0/response');
var ApiError = require('helpers/api/v0/error');

module.exports = function (Model) {
  return new RestApi(Model);
};

function RestApi(Model) {
  this.Model = Model;

  this.get = function (req, res, next) {
    Model.find({}, function (err, users) {
      if (err) {
        res.json(new ApiResponse(new ApiError(err), null));
      } else {
        res.json(new ApiResponse(null, users));
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
            res.json(new ApiResponse(null, apiStatus.S201, newModel));
          }
        });
      }
    });

  };

  this.getById = function (req, res, next) {
    try {
      var id = new ObjectID(req.params.id);
    } catch (e) {
      res.json(new ApiResponse(new ApiError(null, 400, 'Incorrect record ID'), null));
    }
    Model.findById(id, function (err, user) {
      if (err) {
        res.json(new ApiResponse(new ApiError(err), null));
      } else {
        if (!user) {
          res.json(new ApiResponse(new ApiError(null, 404, 'Record not found'), apiStatus.S404, null));
        } else {
          res.json(new ApiResponse(null, user));
        }
      }
    });
  };

  this.putById = function (req, res, next) {
    try {
      var rawData = req.body.data || req.body;
      var id = new ObjectID(rawData.id || rawData._id);
      delete rawData._id;
    } catch (e) {
      res.json(new ApiResponse(new ApiError(null, 400, 'Incorrect record ID'), null));
    }
    Model.update({"_id": id}, rawData, {upsert: true}, function (err, result) {
      if (err) {
        res.json(new ApiResponse(new ApiError(err), null));
      } else {
        if (result < 1) {
          res.json(new ApiResponse(new ApiError(null, 404, 'Record does not exist'), null));
        } else {
          res.json(new ApiResponse(null, {"recordsAffected": result}));
        }
      }
    });
  };

  this.deleteById = function (req, res, next) {
    try {
      var rawData = req.body.data || req.body;
      var id = new ObjectID(rawData.id);
    } catch (e) {
      res.json(new ApiResponse(new ApiError(null, 400, 'Incorrect record ID'), null));
    }
    Model.remove({"_id": id}, function (err, result) {
      if (err) {
        res.json(new ApiResponse(new ApiError(err), null));
      } else {
        if (result < 1) {
          res.json(new ApiResponse(new ApiError(null, 404, 'Record does not exist'), null));
        } else {
          res.json(new ApiResponse(null, {"recordsAffected": result}));
        }
      }
    });
  };

}

RestApi.prototype.name = "RestApi";