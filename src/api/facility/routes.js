const routes = (handler) => [
  {
    method: 'GET',
    path: '/{id}',
    handler: handler.getListFacilityByIdSpotHandler,
  },
]

module.exports = routes;
