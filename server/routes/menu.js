'use strict';

var Page = require('../models/page'),
    Gallery = require('../models/gallery'),
    JsonResponse = require('../helpers/json/response'),
    async = require('async');

function getMenu(callback, Model, nested) {
  var path = nested ? nested.path + '/' || '/' : '/';

  Model.find({}, {_id: 0, title: 1, path: 1}, function (err, records) {
    if (err) callback(err);
    else {
      var menu = [];
      if (records.length > 0) {
        records.forEach(function (record) {
          menu.push({path: path + record.path, title: record.title});
        });
        if (nested) {
          callback(null, {
            path: '',
            title: nested.title,
            dropdown: true,
            nestedMenu: menu
          });
        } else {
          callback(null, menu);
        }
      } else {
        callback(null, menu);
      }
    }
  });
}

module.exports.menu = function (req, res, next) {
  async.parallel({
      pages: function(callback){
        getMenu(callback, Page);
      },
      galleries: function(callback) {
        getMenu(callback, Gallery, {path: '/artworks', title:'Artworks'});
      }
  }, function (err, results) {
    if (err) {
      res.json(new JsonResponse(err));
    } else {
      res.json(new JsonResponse(null, [].concat(results.pages, results.galleries)));
    }
  });
};