'use strict';

/// Include ImageMagick
var im = require('imagemagick'),
    fs = require('fs'),
    async = require('async'),
    JsonResponse = require('../helpers/json/response'),
    ObjectID = require('mongodb').ObjectID,
    log = require('../lib/log')(module),
    Image = require('../models/image');

module.exports = function (app) {
  var root = app.get('views'),
      basePath = '/uploads/images',
      imagesUploads = root + basePath;

  function uploadImage(req, res, next) {
    var imagePath = req.files.files[0].path;
    var originalName = req.files.files[0].name;
    // TODO add extension validation
    if (req.files.files[0].fieldName !== 'files[]' || !originalName || !imagePath) {
      next();
    } else {
      var source = '/source/';
      var big = '/big/';
      var thumbnail = '/thumbnail/';
      var _id = new ObjectID();
      var imageName = _id + '_' + originalName;

      var title = (req.body.title && req.body.title !== 'undefined') ? req.body.title : originalName.split('.')[0];
      var image = {
        _id: _id,
        srcPath: imagesUploads + source + imageName,
        bigPath: imagesUploads + big + imageName,
        thumbnailPath: imagesUploads + thumbnail + imageName,
        url: basePath + big + imageName,
        thumbnailUrl: basePath + thumbnail + imageName,
        name: originalName,
        savedName: imageName,
        title: title,
        type: req.files.files[0].type,
        size: req.files.files[0].size,
        deleteUrl: '/images/' + imageName,
        deleteType: 'DELETE'
      };

      async.parallel({
        source: function (callback) {
          fs.readFile(imagePath, function (err, data) {
            if (err) {
              log.error(err.message);
              log.error(err.stack);
              callback(err);
            } else {
              fs.writeFile(image.srcPath, data, function (err) {
                if (err) {
                  log.error(err.message);
                  log.error(err.stack);
                  callback(err);
                } else {
                  callback(null, 'moved original image to \'' + image.srcPath);
                }
              });
            }
          });
        },
        big: function (callback) {
          im.resize({
            srcPath: imagePath,
            dstPath: image.bigPath,
            width: '1680',
            height: '1050>',
            quality: 1.0
          }, function (err, stdout, stderr) {
            if (err) {
              log.error(err.message);
              log.error(err.stack);
              callback(err);
            } else {
              callback(null, 'resized image to fit within 1680x1050px and saved to \'' + image.url);
            }
          });
        },
        thumbnail: function (callback) {
          im.resize({
            srcPath: imagePath,
            dstPath: image.thumbnailPath,
            width: '120',
            height: '90>',
            quality: 1.0
          }, function (err, stdout, stderr) {
            if (err) {
              log.error(err.message);
              log.error(err.stack);
              callback(err);
            } else {
              callback(null, 'resized image to fit within 120x90px and saved to \'' + image.thumbnailUrl);
            }
          });
        }
      }, function (err, results) {
        var files = {"files": []};

        function onError(err) {
          fs.unlink(imagePath);
          fs.unlink(image.srcPath);
          fs.unlink(image.bigPath);
          fs.unlink(image.thumbnailPath);
          image = {
            name: image.name,
            size: image.size,
            error: err.message
          };
          files.files.push(image);
          res.json(files);
        }

        function onSuccess() {
          fs.unlink(imagePath);
          delete image._id;
          delete image.srcPath;
          delete image.bigPath;
          delete image.thumbnailPath;
          files.files.push(image);
          res.json(files);
        }

        if (err) {
          onError(err);
        } else {
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
      });
    }
  }

  function getImages(req, res, next) {
    Image.find({}, {'_id': 0, 'srcPath': 0}, function (err, records) {
      if (err) {
        res.json({"files": []});
      } else {
        res.json({files: records});
      }
    });
  }

  function deleteImage(req, res, next) {
    var imageName = req.params.imageName;
    var fields = {_id: 1, srcPath: 1, bigPath: 1, thumbnailPath: 1};

    function response(result) {
      var response = {};
      response[imageName] = result;
      res.json(response);
    }

    Image.find({savedName: imageName}, fields, function (err, records) {
      if (err || records.length === 0) {
        response(false);
      } else {
        var image = records[0];

        Image.remove({savedName: imageName}, function (err, affectedRecords) {
          if (err) {
            response(true);
          } else {
            async.parallel({
              source: function (callback) {
                fs.unlink(image.srcPath, callback)
              },
              big: function (callback) {
                fs.unlink(image.bigPath, callback)
              },
              thumbnail: function (callback) {
                fs.unlink(image.thumbnailPath, callback)
              }
            }, function (err, results) {
              if (err) response(false);
              else response(true);
            });
          }
        })
      }
    });
  }

  app.post('/images', uploadImage);
  app.get('/images', getImages);
  app.delete('/images/:imageName', deleteImage);
};