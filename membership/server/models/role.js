module.exports = function(mongoose) {
	var RoleSchema = new mongoose.Schema({
		name: { type: String, required: true, unique: true }
	});

	mongoose.model('Role', RoleSchema);
};
