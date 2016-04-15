module.exports = {
  invite: {
    from: config.site.title + ' Robot <' + config.mail.emails.robot + '>',
    subject: 'You have been invited to ' + config.site.title
  },

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

  passport: {
    local: {
      usernameField: 'email'
    },

    scope: [ 'email' ],

    providers: {
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
    }
  }
};
