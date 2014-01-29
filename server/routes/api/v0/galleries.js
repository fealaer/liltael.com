var Gallery = require('../../../models/gallery'),
    rest = require('../../../controllers/api/v0/rest')(Gallery),
    checkAuth = require('../../../middleware/checkAuth');

module.exports = function (app) {
  app.get('/api/v0/galleries', rest.query);
  app.get('/api/v0/galleries/:id', rest.get);
  app.get('/api/v0/galleries/:field/:value', rest.getByField);
  app.post('/api/v0/galleries', checkAuth, rest.post);
  app.delete('/api/v0/galleries/:id', checkAuth, rest.delete);
  app.put('/api/v0/galleries', checkAuth, rest.put);
  app.put('/api/v0/galleries/move', checkAuth, rest.move);
};