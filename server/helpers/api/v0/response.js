var apiStatus = require('./status'),
    HttpError = require('../../../error').HttpError;

function ApiResponse(error, result) {
  if (!error) {
    this.status = apiStatus.S200;
  } else {
    this.status = apiStatus.statusByCode(error.code);
  }
  if ((!error && !result) || (error && result))
    throw new HttpError(500, "Internal server error: Illegal arguments for ApiResponse. Server can't return valid response.");
  this.result = result || {};
  this.error = error || {};
}

ApiResponse.prototype.name = "ApiResponse";

module.exports = ApiResponse;