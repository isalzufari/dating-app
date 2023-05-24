const routes = (handler) => [
  {
    method: 'GET',
    path: '/area',
    handler: handler.getAreaHandler,
  },
  {
    method: 'GET',
    path: '/region',
    handler: handler.getRegionHandler,
  },
  {
    method: 'GET',
    path: '/spot/{id}',
    handler: handler.getSpotByLocationHandler,
  }
];

module.exports = routes;
