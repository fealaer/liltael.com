var auth = require('./auth'),
    menu = require('./menu'),
    recent = require('./recent'),
    path = require('path');

module.exports = function (app) {
  require('./api/v0')(app);
  require('./uploadImages')(app);

  app.post('/signin', auth.signIn);
  app.post('/signout', auth.signOut);
  app.get('/menu', menu.menu);
  app.get('/recent/posts', recent.recentPosts);
  app.get('/recent/works', recent.recentWorks);

  app.get('/images/in/gallery/:path', require('./imagesInGallery').get);
  app.get('/*admin*', function(req, res, next) {
    res.sendfile(path.join(app.get('views'), 'admin.html'));
  });
  app.get('/', function(req, res, next) {
    res.sendfile(path.join(app.get('views'), 'index.html'));
  });
};