
module.exports = function(mongoose, schemas, plugins, epiphany) {
	var config = epiphany.config.content;

	fieldSchema = {
		name: String,
		path: String,
		content: String,
		draft: String
	};

	if(_.isArray(config.languages) && config.languages.length > 1) {
		fieldSchema.content = {};
		config.languages.forEach(function(lang) {
			fieldSchema.content[lang.iso] = String;
		});
	}

	var FieldSchema = new mongoose.Schema(fieldSchema);

	FieldSchema.plugin(plugins.base);

	mongoose.model('Field', FieldSchema);
};
