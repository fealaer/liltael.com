var User = require('../../../models/user').User,
    rest = require('../../../controllers/api/v0/rest')(User),
    checkDB = require('../../../middleware/checkDB');

module.exports = function (app) {
  app.get('/api/v0/users', checkDB, rest.get);
  app.get('/api/v0/users/:id', checkDB, rest.getById);
  app.post('/api/v0/users', checkDB, rest.post);
  app.delete('/api/v0/users', checkDB, rest.deleteById);
  app.put('/api/v0/users', checkDB, rest.putById);
};