// modules > native
var crypto = require('crypto');

// modules > 3rd party
var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema(_.defaults({
	email: { type: String, required: true, unique: true },
	local: {
		password: String,
		reset: {
			date: Date,
			code: String
		},
		verificationCode: { type: String },
	},
	facebook: {
		id: String,
		token: String,
		email: String
	},
	google: {
		id: String,
		token: String,
		email: String
	},
	givenName: String,
	familyName: String,
	roles: { type: [ { type: String } ], required: true, default: [ 'member' ] },
	lastActivity: { type: Date },
	lastLogin: { type: Date },
	dateCreated: { type: Date, default: Date.now },
	loginAttempts: { type: Number, default: 0 },
	isActive: { type: Boolean, default: true },
	isBanned: { type: Boolean, default: false },
	isBlocked: { type: Boolean, default: false },
	isVerified: { type: Boolean, default: false }
}, require('epiphany/schemas/person')));

UserSchema.methods.login = function() {
	this.lastLogin = Date.now();

	if(this.local.reset)
		this.local.reset = undefined;

	this.save(function(err) {
		// TODO send error to error handler
		if(err) console.log(err);
	});
};

UserSchema.methods.generateVerificationCode = function() {
	this.local.verificationCode = crypto.createHash('sha512').update(Date.now() + this.email).digest('hex');

	this.save(function(err) {
		// TODO ensure response doesnt get sent twice
		if(err) next(err);
	});
};

UserSchema.methods.resetPassword = function() {
	if(!this.local)
		return false;

	var date = Date.now();
	var hash = crypto.createHash('sha512').update(date + this.local.password + this.email).digest('hex');

	this.local.reset = {
		date: date,
		code: hash
	};

	this.save(function(err) {
		// TODO ensure response doesnt get sent twice
		if(err) next(err);
	});
};

var SALT_LENGTH = 16;

UserSchema.path('local.password').set(function(password) {
	// generate salt
	password = password.trim();
	var chars = '0123456789abcdefghijklmnopqurstuvwxyz';
	var salt = '';
	for (var i = 0; i < SALT_LENGTH; i++) {
		var j = Math.floor(Math.random() * chars.length);
		salt += chars[j];
	}

	// hash the password
	var passwordHash = crypto.createHash('sha512').update(salt + password).digest('hex');

	// entangle the hashed password with the salt and save to the model
	return entangle(passwordHash, salt, password.length);
});

UserSchema.methods.hasRole = function (role) {
	return this.roles.indexOf(role) > -1;
};

UserSchema.methods.authenticate = function(password) {
	password = password.trim();
	var obj = detangle(this.local.password, password.length);

	return crypto.createHash('sha512').update(obj.salt + password).digest('hex') === obj.hash;
};

function entangle(string, salt, t) {
	string = salt + string;
	var length = string.length;

	var arr = string.split('');
	for(var i = 0; i < salt.length; i++) {
		var num = ((i + 1) * t) % length;
		var tmp = arr[i];
		arr[i] = arr[num];
		arr[num] = tmp;
	}

	return arr.join('');
}

function detangle(string, t) {
	var length = string.length;

	var arr = string.split('');
	for(var i = SALT_LENGTH - 1; i >= 0; i--) {
		var num = ((i + 1) * t) % length;
		var tmp = arr[i];
		arr[i] = arr[num];
		arr[num] = tmp;
	}
	var str = arr.join('');

	return {
		salt: str.substring(0, SALT_LENGTH),
		hash: str.substring(SALT_LENGTH)
	};
}

module.exports = mongoose.model('User', UserSchema);
