const ReviewHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'reviews',
  version: '1.0.0',
  register: async (server, { reviewService, spotService }) => {
    const reviewHandler = new ReviewHandler(reviewService, spotService);
    server.route(routes(reviewHandler))
  }
}