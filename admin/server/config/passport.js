module.exports = function(config) {
	if(!config.site) throw new Error('config.site has not been set yet.');

	return {
		local: {
			usernameField: 'email'
		},
		scope: [ 'email' ],
		messages: {
			login: {
				notLocal: 'Account requires external login.',
				wrongPassword: 'Wrong password.',
				noLocalUser: 'No user registered with that email.',
				noExternalUser: 'The account is not connected to this website.',
				externalLoginFailed: 'External login failed.',
				unverified: 'This account has not been verified.',
				banned: 'User is banned.',
				blocked: 'User is blocked due to too many login attempts.'
			},

			register: {

			}
		},
		facebook: {
			clientID: 'changeThisFool',
			clientSecret: 'changeThisFool',
			callbackURL: config.site.url + "/auth/facebook/callback",
			passReqToCallback: true
		},
		google: {
			clientID: 'changeThisFool',
			clientSecret: 'changeThisFool',
			callbackURL: config.site.url + "/auth/google/callback",
			passReqToCallback: true
		}
	};
};
