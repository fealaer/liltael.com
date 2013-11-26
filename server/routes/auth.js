var User = require('../models/user').User,
    HttpError = require('../error').HttpError,
    AuthError = require('../error').AuthError,
    ValidationError = require('../error').ValidationError,
    JsonResponse = require('../helpers/json/response'),
    JsonError = require('../helpers/json/error');

module.exports.signIn = function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;

  User.authorize(username, password, function (err, user) {
    if (err) {
      if (err instanceof AuthError || err instanceof ValidationError) {
        return res.json(new JsonResponse(new JsonError(err), null));
      } else {
        return next(err);
      }
    }

    req.session.user = user._id;
    user = JSON.parse(JSON.stringify(user));
    delete user["hashedPassword"];
    delete user["salt"];
    return res.json(new JsonResponse(null, user));
  });
};

module.exports.signOut = function(req, res) {
  req.session.destroy();
  res.json(new JsonResponse(null, {}));
};