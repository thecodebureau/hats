var passport = require('passport');

module.exports = function(mw, epiphany) {
	mw = mw.passport;

	var routes = [
		[ 'post', '/local', mw.local ],
		[ 'get', '/logout', mw.logout ]
	];

	passport.providers.forEach(function(provider) {
		routes.push([ 'get', '/' + provider, mw[provider].login ]);
		routes.push([ 'get', '/' + provider + '/callback', mw[provider].callback ]);
		routes.push([ 'get', '/' + provider + '/verify', mw[provider].verify ]);
	});

	return routes;
};
