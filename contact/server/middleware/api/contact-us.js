module.exports = function(config, mongoose)
{
	var nodemailer = require('nodemailer');

	return function (req, res, next)
	{
		console.log(req.body)
		var smtpTransport = nodemailer.createTransport('SMTP', config.mail);
		res.render('emails/contact-us', req.body, function (err, html)
		{
			smtpTransport.sendMail({
				from: 'Website <no-reply@thecodebureau.com>',
				to: 'robin.hagg@thecodebureau.com',
				subject: 'Message from website visitor',
				html: html
			}, function (err) {
				if (err) throw err;

				res.page = {template: 'pages/contact'};
				res.data.formStatus = {
					type: 'success',
					message: 'Your question has been sent'
				};
				next();
			});
		});
	}
}