var auth = require('./auth'),
    menu = require('./menu');

module.exports = function (app) {
  require('./api/v0')(app);

  app.post('/signin', auth.signIn);
  app.post('/signout', auth.signOut);
  app.get('/menu', menu.menu);
};