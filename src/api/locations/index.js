const LocationHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'locations',
  version: '1.0.0',
  register: async (server, { service }) => {
    const locationHandler = new LocationHandler(service);
    server.route(routes(locationHandler));
  }
}