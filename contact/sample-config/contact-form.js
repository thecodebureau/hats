module.exports = {
	defaults: {
		from: 'Carson Robot <no-reply@carson.nu>',
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
	},

	development: {
		to: 'linus.miller@thecodebureau.com'
	},

	production: {
		to: 'info@carson.nu'
	}
};
