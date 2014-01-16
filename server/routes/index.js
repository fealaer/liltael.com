var auth = require('./auth'),
    menu = require('./menu'),
    recent = require('./recent'),
    images = require('./images');

module.exports = function (app) {
  require('./api/v0')(app);

  app.post('/signin', auth.signIn);
  app.post('/signout', auth.signOut);
  app.get('/menu', menu.menu);
  app.get('/recent/posts', recent.recentPosts);
  app.get('/recent/works', recent.recentWorks);

  app.post('/images', images.upload);
  app.get('/images', images.get);
  app.delete('/images/:imageName', images.delete);
};