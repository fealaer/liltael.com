var User = require('models/user').User;
var rest = require('controllers/api/v0/rest')(User);

module.exports = function (app) {
  app.get('/api/v0/users', rest.get);
  app.get('/api/v0/users/:id', rest.getById);
  app.post('/api/v0/users', rest.post);
  app.delete('/api/v0/users', rest.deleteById);
  app.put('/api/v0/users', rest.putById);
};