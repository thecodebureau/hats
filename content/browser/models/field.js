var app = require('ridge');

var validation = {
	'name': {
		required: true
	},
	'path': {
		required: true
	},
};

var content = {
	required: true
};

if(_.isArray(app.languages) && app.languages.length > 1)
	app.languages.forEach(function(lang) {
		validation['content.' + lang] = content;
	});
else
	validation.content = content;

module.exports = require('ridge/model').extend({
	validation: validation
});
