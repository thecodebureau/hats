module.exports = {
  models: {
    NewsArticle: require('./model')
  },
  middleware: {
    newsArticles: require('./middleware')
  },
  pages: require('./pages'),
  routes: require('./routes')
};
