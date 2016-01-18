var nodemailer = require('nodemailer');

module.exports = function sendNewsletter(req, res, next) {
	var smtpTransport = nodemailer.createTransport('SMTP', config);

	var emails = [];

	_.each(res.data.emails, function (email) {
		emails.push(email.email);
	});

	if(emails.length === 0) {
		emails.push(config.emails.admin);
		emails.push('linus.k.miller@gmail.com');
		emails.push('linus.miller@glocalnet.net');
		emails.push('linus.miller@thecodebureau.com');
	}

	var finished = _.after(emails.length, respond);
	var errors = [];

	res.render('emails/newsletter.dust', req.body, function (err, html) {
		if (err) return next(err);

		req.body.articleBody = html;

		for(var i = 0; i < emails.length; i++) {
			var tmp = i;
			smtpTransport.sendMail({
				from: 'LiverpoolTravel <' + config.emails.robot + '>',
				to: emails[i],
				replyTo: config.emails.info,
				subject: 'LiverpoolTravel Nyhetsbrev',
				html: html
			}, function (err) {
				if (err) {
					errors.push(emails[tmp]);
				}
				finished();
			});
		}
	});
	function respond(){
		console.log(errors);
		res.message = {
			type: 'success',
			heading: 'Ett test meddelande har skickats!',
			text: '"Följande mail skickades inte: "' + errors.join(', ') + '".'
		};
		next();
	}
};
