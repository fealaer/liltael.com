var path = require('path');
var util = require('util');
var http = require('http');

// Errors for users
function HttpError(status, message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, HttpError);

  this.status = status;
  this.message = message || http.STATUS_CODES[status] || 'Error';
}

function AuthError(message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, AuthError);

  this.message = message;
}

function DBError(message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, DBError);

  this.message = message;
}

function ValidationError(path, message) {
  Error.apply(this, arguments);
  Error.captureStackTrace(this, ValidationError);

  this.message = 'Validation Error';
  this.errors = [{
    message: message,
    path: path
  }];
  this.code = 400;
}

util.inherits(HttpError, Error);
util.inherits(AuthError, Error);
util.inherits(DBError, Error);
util.inherits(ValidationError, Error);

HttpError.prototype.name = "HttpError";
AuthError.prototype.name = "AuthError";
DBError.prototype.name = "DBError";
ValidationError.prototype.name = "ValidationError";

module.exports.HttpError = HttpError;
module.exports.AuthError = AuthError;
module.exports.DBError = DBError;
module.exports.ValidationError = ValidationError;