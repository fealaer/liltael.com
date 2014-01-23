'use strict';

/// Include ImageMagick
var JsonResponse = require('../helpers/json/response'),
    ObjectID = require('mongodb').ObjectID,
    Image = require('../models/image'),
    Gallery = require('../models/gallery'),
    checkAuth = require('../middleware/checkAuth'),
    cloudinary = require('cloudinary');

module.exports = function (app) {
  function uploadImage(req, res, next) {
    var imagePath = req.files.files[0].path;
    var originalName = req.files.files[0].name;
    // TODO add extension validation
    if (req.files.files[0].fieldName !== 'files[]' || !originalName || !imagePath) {
      next();
    } else {
      var _id = new ObjectID(),
          title = (req.body.title && req.body.title !== 'undefined') ? req.body.title : originalName.split('.')[0],
          image = {
            _id: _id,
            originalName: originalName,
            title: title,
            type: req.files.files[0].type,
            size: req.files.files[0].size,
            deleteType: 'DELETE'
          };

      cloudinary.uploader.upload(imagePath,
          function (result) {
            var files = {"files": []};

            if (result.error) {
              onError(result.error);
            } else {
              image.src = result.url;
              image.url = result.eager[0].url;
              image.thumbnailUrl = result.eager[1].url;
              image.name = result.public_id;
              image.deleteUrl = '/images/' + result.public_id;
              image.cloudinary = result;

              var newImage = new Image(image);
              newImage.validate(function (err) {
                if (err) {
                  onError(err);
                } else {
                  newImage.save(function (err) {
                    if (err) {
                      onError(err);
                    } else {
                      onSuccess();
                    }
                  });
                }
              });
            }

            function onError(err) {
              image = {
                name: image.originalName,
                size: image.size,
                error: err.message
              };
              files.files.push(image);
              res.json(files);
            }

            function onSuccess() {
              delete image._id;
              delete image.src;
              delete image.cloudinary;
              files.files.push(image);
              res.json(files);
            }
          },
          {
            eager: [
              { width: 1680, height: 1050, crop: "limit" },
              { width: 120, height: 90, crop: "lpad" }
            ]
          });
    }
  }

  function getImages(req, res, next) {
    Image.find({}, {'_id': 0, 'srcPath': 0}, function (err, records) {
      if (err) {
        res.json({"files": [], "error": err.message});
      } else {
        res.json({files: records});
      }
    });
  }

  function deleteImage(req, res, next) {
    var imageName = req.params.imageName;
    var fields = {_id: 1, name: 1, size: 1, cloudinary: 1};
    var errResponse = {"error": ''};

    function response(response, result) {
      response[imageName] = result;
      res.json(response);
    }

    Image.find({name: imageName}, fields, function (err, records) {
      if (err) {
        response({error: err.message}, false);
      } else if (records.length === 0) {
        response({error: 'Image does not exist'}, false);
      } else {
        var image = records[0];

        Gallery.count({images: image._id.toString()}, function (err, records) {
          if (err) {
            response({error: err.message}, false);
          } else if (records !== 0) {
            var gallery = records === 1 ? ' gallery' : ' galleries';
            response({error: 'Image used in ' + records + gallery}, false);
          } else {
            Image.remove({name: imageName}, function (err, affectedRecords) {
              if (err) {
                response({error: err.message}, false);
              } else {
                cloudinary.api.delete_resources([image.cloudinary.public_id], function (result) {
                  if (result.error) {
                    response({error: err.message}, false);
                  }
                  else {
                    response({}, true);
                  }
                });
              }
            })
          }
        })
      }
    });
  }

  app.post('/images', checkAuth, uploadImage);
  app.get('/images', getImages);
  app.delete('/images/:imageName', checkAuth, deleteImage);
};