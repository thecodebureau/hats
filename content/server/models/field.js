
module.exports = function(mongoose, schemas, plugins) {

	var FieldSchema = new mongoose.Schema({
		name: String,
		path: String,
		content: String,
		radio: String,
		check: Array,
		draft: String
	});

	FieldSchema.plugin(plugins.base);

	mongoose.model('Field', FieldSchema);
};
