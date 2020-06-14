const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(createProxyMiddleware('/api', { target: 'https://library-book-club.herokuapp.com/'}));
  app.use(createProxyMiddleware('/auth', { target: 'https://library-book-club.herokuapp.com/'}));
}