module.exports = function(config, mongoose) {
	var nodemailer = require('nodemailer');

	return function (req, res, next) {
		var smtpTransport = nodemailer.createTransport(config.mail);

		res.render('emails/contact-form', req.body, function (err, html) {
			smtpTransport.sendMail({
				from: config.contactForm.from,
				replyTo: req.body.email,
				to: config.contactForm.to,
				subject: config.contactForm.subject,
				html: html
			}, function (err) {
				// TODO try to get a hold page object
				if (err) {
					res.data.formStatus = config.contactForm.error;
					res.status(500);
				} else {
					res.data.formStatus = config.contactForm.success;
				}

				next();
			});
		});
	};
};
