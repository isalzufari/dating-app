const routes = (handler) => [
  {
    method: 'GET',
    path: '/',
    handler: handler.getSpotsHandler
  },
  {
    method: 'POST',
    path: '/',
    handler: handler.postSpotHandler,
  },
  {
    method: 'GET',
    path: '/{slug}',
    handler: handler.getSpotBySlugHandler,
  }
];

module.exports = routes;
