var mw = require('./middleware');

module.exports = [
  {
    title: 'Newsletter',
    middleware: [ mw.newsletterEmails.formatQuery, mw.newsletterEmails.paginate, mw.newsletterEmails.find ],
  }
];
