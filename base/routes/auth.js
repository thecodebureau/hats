module.exports = function(mw, config) {
	mw = mw.passport;

	return [
		[ 'post', '/local', mw.local ],
		[ 'get', '/instagram', mw.instagram.login ],
		[ 'get', '/instagram/callback', mw.instagram.callback ],
		[ 'get', '/instagram/verify', mw.instagram.verify ],
		[ 'get', '/facebook', mw.facebook.login ],
		[ 'get', '/facebook/callback', mw.facebook.callback ],
		[ 'get', '/facebook/verify', mw.facebook.verify ],
		[ 'get', '/logout', mw.logout ]
	];
};
