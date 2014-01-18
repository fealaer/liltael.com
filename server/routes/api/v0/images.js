var Image = require('../../../models/image'),
    rest = require('../../../controllers/api/v0/rest')(Image);

module.exports = function (app) {
  app.get('/api/v0/images', rest.query);
  app.get('/api/v0/images/:id', rest.get);
  app.get('/api/v0/images/:field/:value', rest.getByField);
  app.post('/api/v0/images', rest.post);
  app.delete('/api/v0/images/:id', rest.delete);
  app.put('/api/v0/images', rest.put);
};