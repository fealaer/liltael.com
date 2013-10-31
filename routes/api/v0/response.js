function ApiResponse(error, status, result) {
  this.status = status;
  this.result = result || {};
  this.error = error || {};
}

ApiResponse.prototype.name = "ApiResponse";

module.exports = ApiResponse;