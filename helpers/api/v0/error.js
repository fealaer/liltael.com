var log = require('lib/log')(module);
var util = require('util');
var ENV = process.env.NODE_ENV;

function ApiError(err, code, message) {
  if (err) {
    log.error(util.format("%j", err));
    if (err.name == 'ValidationError') {
      log.error(util.format("%j", err));
//      for (field in err.errors) {
//        switch (err.errors[field].type) {
//          case 'exists':
//
//            break;
//          case 'invalid':
//          ...
//            break;
//          ...
//        }
//      }
    } else if (err.name == "MongoError" && err.code == 11000) {
      this.message = err.message;
      this.code = 404;
    } else {
      this.message = 'Internal server error';
      this.code = 500;
    }
  } else {
    this.message = message;
    this.code = code;
  }
  this.moreInfo = util.format('http://localhost:3000/api/docs/errors/%d', this.code);
}


ApiError.prototype.name = "ApiError";

module.exports = ApiError;
