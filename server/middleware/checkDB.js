var HttpError = require('../error').DBError,
    mongoose = require('../lib/mongoose'),
    log = require('../lib/log')(module);

// method which checks is DB ready for work or not
module.exports = function(req, res, next) {
  if (mongoose.readyState !== 1) {
    return next(new DBError("DataBase disconnected"));
  }
  next();
};