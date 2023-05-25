const SpotHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'spot',
  version: '1.0.0',
  register: async (server, {
    spotService,
    reviewService,
    facilityService,
    locationService
  }) => {
    const spotHandler = new SpotHandler(
      spotService,
      reviewService,
      facilityService,
      locationService
    );
    server.route(routes(spotHandler));
  }
}