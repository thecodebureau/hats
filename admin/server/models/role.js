module.exports = function(mongoose) {
	var RoleSchema = new mongoose.Schema({
		name: { type: String, required: true, unique: true },
		dateCreated: { type: Date, default: Date.now }
	});

	mongoose.model('Role', RoleSchema);
};
