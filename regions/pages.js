'use strict';

var mw = require('express-service-regions/middleware');

var getLanguages = require('warepot/get-languages');

module.exports = [ {
  title: 'Regions',
  middleware: [ mw.formatQuery, mw.paginate, mw.find, mw.paths ],
  reload: true,
  template: 'admin/pages/regions',
  pages: [ {
    path: ':id',
    template: 'admin/pages/region',
    middleware: [ mw.findById, getLanguages, mw.paths ],
    reload: true,
    nav: false
  } ]
} ];
