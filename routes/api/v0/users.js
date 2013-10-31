var User = require('models/user').User;
var HttpError = require('error').HttpError;
var ObjectID = require('mongodb').ObjectID;
var ApiResponse = require('./response');
var ApiError = require('./error');
var apiStatus = require('./status');

module.exports.get = function (req, res, next) {
  User.find({}, function (err, users) {
    if (err) {
      res.json(new ApiResponse(new ApiError(err), apiStatus.S500, null));
    } else {
      res.json(new ApiResponse(null, apiStatus.S200, users));
    }
  });
};


module.exports.getById = function (req, res, next) {
  try {
    var id = new ObjectID(req.params.id);
  } catch (e) {
    res.json(new ApiResponse(new ApiError(null, 400, 'Incorrect user ID'), apiStatus.S400, null));
  }
  User.findById(id, function (err, user) {
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

module.exports.post = function (req, res, next) {
  var user = new User({
    username: req.body.username,
    password: req.body.password,
    quotes: req.body.quotes
  });
  user.validate(function (err) {
    if (err) {
      res.json(new ApiResponse(new ApiError(err), apiStatus.S404, null));
    } else {
      user.save(function (err) {
        if (err) {
          res.json(new ApiResponse(new ApiError(err), apiStatus.S500, null));
        } else {
          res.json(new ApiResponse(null, apiStatus.S201, user));
        }
      });
    }
  });

};