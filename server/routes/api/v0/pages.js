var Page = require('../../../models/page'),
    rest = require('../../../controllers/api/v0/rest')(Page),
        checkAuth = require('../../../middleware/checkAuth');

module.exports = function (app) {
  app.get('/api/v0/pages', rest.query);
  app.get('/api/v0/pages/:id', rest.get);
  app.get('/api/v0/pages/:field/:value', rest.getByField);
  app.post('/api/v0/pages', checkAuth, rest.post);
  app.delete('/api/v0/pages/:id', checkAuth, rest.delete);
  app.put('/api/v0/pages', checkAuth, rest.put);
};