
module.exports = function(mongoose, schemas, plugins) {
	var PageSchema = new mongoose.Schema({
		_id: String,
		name: String,
		content: {},
		author: String,
	});

	PageSchema.plugin(plugins.base);

	mongoose.model('Page', PageSchema);
};
