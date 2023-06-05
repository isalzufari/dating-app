const AppHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'app',
  version: '1.0.0',
  register: async (server, {
    spotService,
    reviewService,
    facilityService,
    locationService
  }) => {
    const appHandler = new AppHandler(
      spotService,
      reviewService,
      facilityService,
      locationService
    );
    server.route(routes(appHandler));
  }
}