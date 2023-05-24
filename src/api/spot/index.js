const SpotHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'spot',
  version: '1.0.0',
  register: async (server, {
    spotService,
    reviewService,
    facilityService,
  }) => {
    const spotHandler = new SpotHandler(
      spotService,
      reviewService,
      facilityService,
    );
    server.route(routes(spotHandler));
  }
}