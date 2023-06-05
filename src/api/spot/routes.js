const routes = (handler) => [
  {
    method: 'GET',
    path: '/',
    handler: handler.getSpotsHandler
  },
  {
    method: 'PUT',
    path: '/',
    handler: handler.updateSpotHandler,
    options: {
      auth: 'dateapp_jwt'
    },
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
    method: 'DELETE',
    path: '/',
    handler: handler.deleteSpotHandler,
    options: {
      auth: 'dateapp_jwt'
    },
  },
  {
    method: 'GET',
    path: '/{slug}',
    handler: handler.getSpotBySlugHandler,
    options: {
      auth: {
        strategy: 'dateapp_jwt',
        mode: 'optional'
      }
    },
  },
  {
    method: 'GET',
    path: '/region/{id}',
    handler: handler.getSpotByRegionHandler,
  }
];

module.exports = routes;
