var config = ('./config');

var nodemailer = require('nodemailer');

module.exports = function (req, res, next) {
	var smtpTransport = nodemailer.createTransport(config.smtp);

	res.render('emails/contact-form', req.body, function (err, html) {
		smtpTransport.sendMail({
			from: config.from,
			replyTo: req.body.email,
			to: config.to,
			subject: config.subject,
			html: html
		}, function (err) {
			// TODO try to get a hold page object
			if (err) {
				res.locals.formStatus = config.error;
				res.status(500);
			} else {
				res.locals.formStatus = config.success;
			}

			next();
		});
	});
};
