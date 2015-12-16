var mongoose = require('mongoose');

function returnError(req, res, next) {
	var err = new Error('Unauthorized request');
	err.status = 401;
	next(err);
}

var isAuthenticated = function(req, res, next) {
	if(req.isAuthenticated()) {
		next();
	} else {
		return returnError(req, res, next);
	}
};

var redirectAuthenticated = function(path) {
	return function redirectAuthenticated(req, res, next) {
		if(req.isAuthenticated()) {
			res.redirect(path);
		} else {
			next();
		}
	};
};

var isCurrent = function(req, res, next) {
	if(req.user && req.params.id === req.user._id.toString()) 
		next();
	else
		return returnError(req, res, next);
};

var hasRole = function(role) {
	return function(req, res, next) {
		if(req.isAuthenticated() && req.user.hasRole(role)) {
			return next();
		}
		return returnError(req, res, next);
	};
};

var isAdmin = hasRole('admin');

module.exports = {
	isAuthenticated: isAuthenticated,
	isCurrent: isCurrent,
	redirectAuthenticated: redirectAuthenticated,
	hasRole: hasRole,
	isAdmin: isAdmin
};
