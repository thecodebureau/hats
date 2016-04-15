var config = {
  smtp: require('./smtp'),
  site: require('./site')
};

module.exports = {
  smtp: config.smtp,
  from: config.site.title + ' Robot <' + config.site.emails.robot + '>',
  to: config.site.emails.info,
  subject: 'Meddelande från besökare till ' + config.site.domain,
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
};
