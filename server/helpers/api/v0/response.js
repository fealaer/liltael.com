var apiStatus = require('./status');

function ApiResponse(error, result) {
  if (!error) {
    this.status = apiStatus.S200;
  } else {
    this.status = apiStatus.statusByCode(error.code);
  }
  this.result = result || {};
  this.error = error || {};
}

ApiResponse.prototype.name = "ApiResponse";

module.exports = ApiResponse;