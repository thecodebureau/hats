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

var Model = require('ridge/model').extend();

_.extend(Model.prototype, require('ridge/mixins/validate'), {
	validation: validation
});

module.exports = Model;
