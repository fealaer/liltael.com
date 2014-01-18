'use strict';

var http = require('http'),
    JsonResponse = require('../helpers/json/response'),
    JsonError = require('../helpers/json/error'),
    Gallery = require('../models/gallery'),
    Image = require('../models/image');

module.exports.recentPosts = function (req, res, next) {
  http.get("http://katyapushkareva.blogspot.com/feeds/posts/default?max-results=6&alt=json",
      function (response) {
        var body = '';
        response.on('data', function (chunk) {
          body += chunk;
        });
        response.on('end', function () {
          var data = JSON.parse(body);
          var posts = [];
          data.feed.entry.forEach(function (entry) {
            entry.link.forEach(function (link) {
              if (link.rel === "alternate") {
                posts.push({href: link.href, title: link.title});
              }
            })
          });
          res.json(new JsonResponse(null, posts));
        });
      }).on('error', function (err) {
        res.json(new JsonResponse(JsonError(err)));
      });
};

module.exports.recentWorks = function (req, res, next) {
  Gallery.aggregate([
    {$unwind: "$images"},
    {$group: {_id: "images", images: { $addToSet: "$images" }}}
  ], function (err, result) {
    if (err) {
      res.json(new JsonResponse(JsonError(err)));
    } else {
      console.log(result[0].images);
      var query = Image.find({_id: {$in: result[0].images}}, {_id: 1, url: 1, thumbnailUrl: 1, title: 1});
      query.sort({_id: -1});
      query.limit(6);
      query.exec('find', function (err, records) {
        if (err) {
          res.json(new JsonResponse(new JsonError(err), null));
        } else {
          res.json(new JsonResponse(null, records));
        }
      })
    }
  });
};