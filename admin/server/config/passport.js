var path = require('path');

module.exports = function(config) {
	if(!config.domain) throw new Error('config.domain is undefined');

	return {
		local: {
			usernameField: 'email'
		},
		facebook: {
			clientID: 'changeThisFool',
			clientSecret: 'changeThisFool',
			callbackURL: path.join(config.domain, "/auth/facebook/callback"),
			passReqToCallback: true
		},
		instagram: {
			clientID: 'changeThisFool',
			clientSecret: 'changeThisFool',
			callbackURL: path.join(config.domain, "/auth/instagram/callback"),
			passReqToCallback: true
		}
	};
};
