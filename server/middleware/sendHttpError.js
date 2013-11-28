var JsonResponse = require('../helpers/json/response');
var JsonError = require('../helpers/json/error');

module.exports = function(req, res, next) {
  res.sendHttpError = function(error) {
    if (res.req.headers['x-requested-with'] === 'XMLHttpRequest') {
      res.json(new JsonResponse(new JsonError(error), null));
    } else {
      res.status(error.status);
      res.render('error', {error: error});
    }
  };
  next();
};