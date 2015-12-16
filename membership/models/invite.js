// modules > native
var crypto = require('crypto');

// modules > 3rd party
var mongoose = require('mongoose');

var InviteSchema = new mongoose.Schema({
	_id: String,
	email: { type: String, required: true, unique: true },
	roles: { type: [ String ], required: true },
	inviter: {
		_id: { type: mongoose.Schema.ObjectId, ref: 'UserSchema', required: true },
		email: { type: String, required: true }
	},
	dateCreated: {
		type: Date,
		default: Date.now
	},
	dateConsumed: Date
});

InviteSchema.pre('validate', function(done) {
	if(this.isNew) {
		var date = Date.now(),
			chars = '0123456789abcdefghijklmnopqurstuvwxyz',
			salt = '';

		for (var i = 0; i < 12; i++) {
			var j = Math.floor(Math.random() * chars.length);
			salt += chars[j];
		}

		this._id = crypto.createHash('sha256').update(date + salt + this.email).digest('hex');
	}

	done();
});

module.exports = mongoose.model('Invite', InviteSchema);
