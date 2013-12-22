var User = require('../../../models/user'),
    rest = require('../../../controllers/api/v0/rest')(User),
    checkDB = require('../../../middleware/checkDB');

module.exports = function (app) {
  app.get('/api/v0/users', rest.query);
  app.get('/api/v0/users/:id', rest.get);
  app.post('/api/v0/users', rest.post);
  app.delete('/api/v0/users', rest.delete);
  app.put('/api/v0/users', rest.put);
};