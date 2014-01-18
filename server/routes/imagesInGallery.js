'use strict';

var Image = require('../models/image'),
    Gallery = require('../models/gallery'),
    JsonResponse = require('../helpers/json/response'),
    JsonError = require('../helpers/json/error');


module.exports.get = function (req, res, next) {
  var path = req.params.path;
  Gallery.findOne({path: path}, {_id: 0, images: 1}, function(err, record) {
    if (err) {
      res.json(new JsonResponse(new JsonError(err), null));
    } else if (!record) {
      res.json(new JsonResponse(new JsonError(null, 404, 'Record not found'), null));
    } else {
      Image.find({_id: {$in: record.images}}, {_id: 1, url: 1, thumbnailUrl: 1, title: 1}, function(err, records) {
        if (err) {
          res.json(new JsonResponse(new JsonError(err), null));
        } else {
          var images = JSON.parse(JSON.stringify(records));

          for (var i = 0; i < images.length; i++) {
            images[i].position = record.images.indexOf(images[i]._id) + 1;
          }

          res.json(new JsonResponse(null, images));
        }
      })
    }
  })
};