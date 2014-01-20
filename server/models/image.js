var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  srcPath: {
    type: String,
    unique: true,
    required: 'Path to src image is required',
    select: false
  },
  bigPath: {
    type: String,
    unique: true,
    required: 'Path to big image is required',
    select: false
  },
  thumbnailPath: {
    type: String,
    unique: true,
    required: 'Path to thumbnail image is required',
    select: false
  },
  url: {
    type: String,
    unique: true,
    required: 'Image Url is required'
  },
  thumbnailUrl: {
    type: String,
    unique: true,
    required: 'Thumbnail Url is required'
  },
  name: {
    type: String,
    required: 'Image name is required'
  },
  savedName: {
    type: String,
    unique: true
  },
  title: {
    type: String
  },
  type: {
    type: String,
    required: 'Image name is required'
  },
  size: {
    type: Number,
    required: 'Size of image is required'
  },
  deleteUrl: {
    type: String,
    unique: true,
    required: 'Delete Url is required'
  },
  deleteType: {
    type: String,
    default: 'DELETE'
  }
}, { versionKey: false });

module.exports = mongoose.model('Image', schema);