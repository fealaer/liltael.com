'use strict';

var http = require('http'),
    JsonResponse = require('../helpers/json/response');

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
        res.json(new JsonResponse(err));
      });
};

module.exports.recentWorks = function (req, res, next) {
  res.json(new JsonResponse(null, []));
};