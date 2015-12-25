var isAuthenticated = require('hats/membership/middleware/authorization').isAuthenticated;

var mw = require('./middleware');

module.exports = [
	[ '/api/gallery-images/', 'get', [ mw.formatQuery, mw.paginate, mw.find ]],
	[ '/api/gallery-images/', 'post', [ isAuthenticated, mw.create ]],
	[ '/api/gallery-images/:id', 'get', [ mw.findById ] ],
	[ '/api/gallery-images/:id', 'put', [ isAuthenticated, mw.put ]],
	[ '/api/gallery-images/:id', 'patch', [ isAuthenticated, mw.patch ]],
	[ '/api/gallery-images/:id', 'delete', [ isAuthenticated, mw.remove ]]
];
