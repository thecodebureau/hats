// modules > 3rd party
var mongoose = require('mongoose');

var config = require('./config');

var fieldSchema = {
	name: String,
	path: String,
	content: String,
	draft: String
};

if(config && _.isArray(config.languages) && config.languages.length > 1) {
	fieldSchema.content = {};

	config.languages.forEach(function(lang) {
		fieldSchema.content[lang.iso] = String;
	});
}

var FieldSchema = new mongoose.Schema(fieldSchema);

FieldSchema.plugin(require('warepot/plugins/base'));

module.exports = mongoose.model('Field', FieldSchema);
