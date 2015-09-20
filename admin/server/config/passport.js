var path = require('path');

module.exports = function(config) {
	if(!config.domain) throw new Error('config.domain is undefined');

	return {
		local: {
			usernameField: 'email'
		},
		messages: {
			notLocal: 'Account requires external login.',
			wrongPassword: 'Wrong password.',
			noLocalUser: 'No user registered with that email.',
			noExternalUser: 'The account is not connected to this website.',
			externalLoginFailed: 'External login failed.',
			unverified: 'This account has not been verified.',
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
