var Gallery = require('../../../models/gallery'),
    rest = require('../../../controllers/api/v0/rest')(Gallery);

module.exports = function (app) {
  app.get('/api/v0/galleries', rest.query);
  app.get('/api/v0/galleries/:id', rest.get);
  app.get('/api/v0/galleries/:field/:value', rest.getByField);
  app.post('/api/v0/galleries', rest.post);
  app.delete('/api/v0/galleries/:id', rest.delete);
  app.put('/api/v0/galleries', rest.put);
};