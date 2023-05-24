const FacilityHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'facility',
  version: '1.0.0',
  register: async (server, { service }) => {
    const facilityHandler = new FacilityHandler(service);
    server.route(routes(facilityHandler));
  }
}