module.exports = function (app) {
  require('./pages')(app);
  require('./galleries')(app);
  require('./images')(app);
};