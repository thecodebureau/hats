var path = require('path');

module.exports = function(config) {
	if(!config.domain) throw new Error('config.domain is undefined');

	return {
		local: {
			usernameField: 'email'
		},
		messages: {
			notLocal: 'Account requires social login.',
			wrongPassword: 'Wrong password.',
			noUser: 'No user found.',
			banned: 'User is banned.',
			blocked: 'User is blocked due to too many login attempts.'
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
