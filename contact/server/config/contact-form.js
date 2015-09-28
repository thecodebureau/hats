module.exports = {
	from: 'no-reply@thecodebureau.com',
	to: 'info@thecodebureau.com',
	subject: 'Message from website visitor',
	error: {
		type: 'error',
		heading: 'Oops!',
		body: 'There was an error sending your email. Please try again or contact the webmaster if the problem persists.'
	},
	success: {
		type: 'success',
		heading: 'Message sent!',
		body: 'We will respond to your request as soon as possible'
	}
};