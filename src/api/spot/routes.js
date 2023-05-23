const routes = (handler) => [
  {
    method: 'POST',
    path: '/',
    handler: handler.postSpotHandler,
  }
];

module.exports = routes;
