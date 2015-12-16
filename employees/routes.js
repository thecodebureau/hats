var isAuthenticated = require('hats/membership').middleware.authorization.isAuthenticated;

var mw = require('./middleware');

module.exports =  [
	[ '/api/employees/', 'get', [ mw.formatQuery, mw.paginate, mw.find ]],
	[ '/api/employees/', 'post', [ isAuthenticated, mw.create ]],
	[ '/api/employees/:id', 'get', [ isAuthenticated, mw.findById ]],
	[ '/api/employees/:id', 'put', [ isAuthenticated, mw.put ]],
	[ '/api/employees/:id', 'patch', [ isAuthenticated, mw.patch ]],
	[ '/api/employees/:id', 'delete', [ isAuthenticated, mw.remove ]]
];
