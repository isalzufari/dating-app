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
    options: {
      auth: 'dateapp_jwt'
    },
  },
  {
    method: 'GET',
    path: '/{slug}',
    handler: handler.getSpotBySlugHandler,
  },
  {
    method: 'GET',
    path: '/region/{id}',
    handler: handler.getSpotByRegionHandler,
  }
];

module.exports = routes;
