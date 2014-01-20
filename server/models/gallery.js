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
    required: 'Title required'
  },
  images: {
    type: Array
  }
}, { versionKey: false });

module.exports = mongoose.model('Gallery', schema);