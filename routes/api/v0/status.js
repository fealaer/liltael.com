function Status(code, name) {
  this.code = code;
  this.name = name;
}

Status.prototype.name = "Status";

module.exports.S200 = new Status(200, 'OK');
module.exports.S400 = new Status(400, 'Bad Request');
module.exports.S500 = new Status(500, 'Internal server error');

module.exports.S201 = new Status(201, 'Created');
module.exports.S304 = new Status(304, 'Not Modified');
module.exports.S404 = new Status(404, 'Not Found');
module.exports.S401 = new Status(401, 'Unauthorized');
module.exports.S403 = new Status(403, 'Forbidden');