var mongoose = require('../lib/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  src: {
    type: String,
    unique: true,
    required: 'Src Url is required',
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
  originalName: {
    type: String
  },
  name: {
    type: String,
    unique: true,
    required: 'Image name is required'
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
  },
  cloudinary: {
    type: Object,
    select: false
  }
}, { versionKey: false });

module.exports = mongoose.model('Image', schema);