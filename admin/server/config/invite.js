module.exports = function(config) {
	return {
		from: config.site.title + ' Robot <' + config.mail.emails.robot + '>',
		subject: 'You have been invited to ' + config.site.title
	};
};
