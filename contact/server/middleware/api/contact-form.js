module.exports = function(config, mongoose) {
	var nodemailer = require('nodemailer');

	return function (req, res, next) {
		var smtpTransport = nodemailer.createTransport(config.mail);
		console.log(req.body);

		res.render('emails/contact-form', req.body, function (err, html) {
			smtpTransport.sendMail({
				from: config.mail.emails.robot,
				replyTo: req.body.email,
				to: 'linus.miller@thecodebureau.com',
				subject: 'Message from website visitor',
				html: html
			}, function (err) {
				// TODO try to get a hold page object
				if(!req.xhr)
					res.locals.template = 'pages/kontakt';

				if (err) {
					res.data.formStatus = {
						type: 'error',
						heading: 'Hoppsan!',
						body: 'Det här tyvärr upstått ett problem med att skicka ditt meddelande. Om problemet kvarstår prova gärna att kontakta oss på annat sätt.'
					};
					res.status(500);
				} else {
					res.data.formStatus = {
						type: 'success',
						heading: 'Meddelande skickat!',
						body: 'Vi kommer att besvara på er förfrågan så fort som möjligt! Tack för er tid!'
					};
				}

				next();
			});
		});
	};
};
