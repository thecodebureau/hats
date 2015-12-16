var mailConfig = require('./mail');

var defaults = {
	from: 'Carson Robot <' + mailConfig.emails.robot + '>',
	subject: 'Meddelande från besökare till carson.nu',
	error: {
		type: 'error',
		heading: 'Hoppas!',
		body: 'Det uppstod ett problem. Pröva gärna igen och kontakta supporten om problem kvarstår.'
	},
	success: {
		type: 'success',
		heading: 'Meddelandet har skickats!',
		body: 'Vi kommer att besvara era frågor så fort som möjligt. Tack för er tid!'
	}
};

module.exports = _.merge(defaults, {
	development: {
		to: 'info@domain.com'
	},

	production: {
		to: 'info@domain.com'
	}
}[ENV]);
