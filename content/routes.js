var isAuthenticated = require('hats/membership').middleware.authorization.isAuthenticated;

var mw = require('./middleware');

module.exports = [
	[ '/api/fields/', 'get', [ isAuthenticated, mw.formatQuery, mw.paginate, mw.find ]],
	[ '/api/fields/', 'post', [ isAuthenticated, mw.create ]],
	[ '/api/fields/:id', 'get', [ isAuthenticated, mw.findById ]],
	[ '/api/fields/:id', 'put', [ isAuthenticated, mw.put ]],
	[ '/api/fields/:id', 'patch', [ isAuthenticated, mw.patch ]],
	[ '/api/fields/:id', 'delete', [ isAuthenticated, mw.remove ]],
];
