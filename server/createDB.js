var mongoose = require('./lib/mongoose'),
    async = require('async'),
    ObjectID = require('mongodb').ObjectID;

mongoose.set('debug', true);
require('./models/user');

async.series([
  open,
  removeRecords,
  requireModels,
  createUsers
], function (err, results) {
  mongoose.disconnect();
});

function open(callback) {
  mongoose.connection.on('open', callback);
}

function removeRecords(callback) {
  async.each(Object.keys(mongoose.models), function (modelName, callback) {
    mongoose.models[modelName].remove({}, callback);
  }, callback);
}

function requireModels(callback) {
  async.each(Object.keys(mongoose.models), function (modelName, callback) {
    mongoose.models[modelName].ensureIndexes(callback);
  }, callback);
}

function createUsers(callback) {
  var users = [
    {username: 'Neo', password: 'almostsuper', avatar: 'uploads/images/users/neo.jpeg', quotes: ['I know kung fu.', 'Mr. Wizard. Get me the hell out of here.'], _id: new ObjectID('5260001073657b99d0000001')},
    {username: 'Agent Smith', password: 'imelrond', avatar: 'uploads/images/users/agent-smith.jpeg', quotes: ['Never send a human to do a machine\'s job.']},
    {username: 'Trinity', password: 'trinityhassecrets', avatar: 'uploads/images/users/trinity.jpeg', quotes: ['Dodge this.']},
    {username: 'Mouse', password: 'pipipi', avatar: 'uploads/images/users/mouse.jpeg', quotes: ['To deny our own impulses is to deny the very thing that makes us human.']}
  ];

  async.each(users, function (userData, callback) {
    var user = new mongoose.models.User(userData);
    user.save(callback);
  }, callback);
}