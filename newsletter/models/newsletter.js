var mongoose = require('mongoose');

var NewsletterSchema = new mongoose.Schema({
    dateCreated: { type: Date, default: Date.now },
    body: { type: String, required: true }
});

module.exports = mongoose.model('Newsletter', NewsletterSchema);
