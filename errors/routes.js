var isAuthenticated = require('express-module-membership/passport/authorization-middleware').isAuthenticated;

var mw = require('./middleware');

module.exports = [
  [ '/api/errors/', 'get', [ isAuthenticated, mw.formatQuery, mw.paginate, mw.find ]],
  [ '/api/errors/:id', 'get', [ isAuthenticated, mw.findById ]],
  [ '/api/errors/:id', 'delete', [ isAuthenticated, mw.remove ]],
  [ '/api/errors/', 'delete', [ isAuthenticated, mw.formatQuery, mw.removeQuery ]],
];
