var User = require('models/user').User;
var rest = require('controllers/api/v0/rest')(User);

module.exports = function (app) {
  app.get('/api/v0/users', rest.get);
  app.get('/api/v0/users/:id', rest.getById);
  app.post('/api/v0/users', rest.post);
};