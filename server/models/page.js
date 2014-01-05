var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  path: {
    type: String,
    unique: true,
    required: 'Path required'
  },
  title: {
    type: String,
    unique: true,
    required: 'Path required'
  },
  html: {
    type: String
  },
  raw: {
    type: String
  }
}, { versionKey: false });

module.exports = mongoose.model('Page', schema);