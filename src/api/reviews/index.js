const ReviewHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'reviews',
  version: '1.0.0',
  register: async (server, { service }) => {
    const reviewHandler = new ReviewHandler(service);
    server.route(routes(reviewHandler))
  }
}