var users = require('./users');

module.exports = function (app) {
  app.get('/api/v0/users', users.get);

  app.post('/api/v0/users', users.post);

  app.get('/api/v0/users/:id', users.getById);
};