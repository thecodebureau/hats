module.exports = function(mongoose) {
	var InviteSchema = new mongoose.Schema({
		email: { type: String, required: true, unique: true },
		roles: { type: [ String ], required: true },
		inviter: {
			_id: { type: mongoose.Schema.ObjectId, ref: 'UserSchema', required: true },
			email: { type: String, required: true }
		},
		consumed: {
			type: Boolean,
			default: false
		}
	});

	mongoose.model('Invite', InviteSchema);
};
