var mongoose = require('mongoose');

var emailRegExPattern = /[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/;

var NewsletterEmailSchema = new mongoose.Schema({
		dateCreated: { type: Date, default: Date.now },
		email: { type: String, match: emailRegExPattern, unique: true },
		active: { type: Boolean, default: true }
});

module.exports = mongoose.model('NewsletterEmail', NewsletterEmailSchema);
