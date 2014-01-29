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
  html: {
    type: String
  },
  raw: {
    type: String
  },
  pos: {
    type: Number
  }
}, { versionKey: false });

schema.pre("save", function (next) {
  var self = this;
  mongoose.models["Page"].findOne({}, {pos: 1, _id: 0}, {sort: {pos: -1}}, function (err, res) {
    if (err) {
      next(err);
    } else {
      self.pos = res.pos + 1;
      next();
    }
  });
});

module.exports = mongoose.model('Page', schema);