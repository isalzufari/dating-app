const SpotHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'spot',
  version: '1.0.0',
  register: async (server, { service }) => {
    const spotHandler = new SpotHandler(service);
    server.route(routes(spotHandler));
  }
}