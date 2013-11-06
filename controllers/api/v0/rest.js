var User = require('models/user').User;
var ObjectID = require('mongodb').ObjectID;
var ApiResponse = require('helpers/api/v0/response');
var ApiError = require('helpers/api/v0/error');
var apiStatus = require('helpers/api/v0/status');

module.exports = function (Model) {
  return new RestApi(Model);
};

function RestApi(Model) {
  this.Model = Model;

  this.get = function (req, res, next) {
    Model.find({}, function (err, users) {
      if (err) {
        res.json(new ApiResponse(new ApiError(err), apiStatus.S500, null));
      } else {
        res.json(new ApiResponse(null, apiStatus.S200, users));
      }
    });
  };

  this.post = function (req, res, next) {
    var rawData = req.body.data || req.body;
    delete rawData._id;
    var newModel = new Model(rawData);
    newModel.validate(function (err) {
      if (err) {
        res.json(new ApiResponse(new ApiError(err), apiStatus.S404, null));
      } else {
        newModel.save(function (err) {
          if (err) {
            res.json(new ApiResponse(new ApiError(err), apiStatus.S500, null));
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
      res.json(new ApiResponse(new ApiError(null, 400, 'Incorrect user ID'), apiStatus.S400, null));
    }
    Model.findById(id, function (err, user) {
      if (err) {
        res.json(new ApiResponse(new ApiError(err), apiStatus.S500, null));
      } else {
        if (!user) {
          res.json(new ApiResponse(new ApiError(null, 404, 'User not found'), apiStatus.S404, null));
        } else {
          res.json(new ApiResponse(null, apiStatus.S200, user));
        }
      }
    });
  };

  this.putById = function (req, res, next) {

  };

  this.deleteById = function (req, res, next) {

  };

}

RestApi.prototype.name = "RestApi";