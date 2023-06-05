const routes = (handler) => [
  {
    method: 'GET',
    path: '/',
    handler: handler.getReviewsAndSpotsHandler,
    options: {
      auth: 'dateapp_jwt'
    },
  },
  {
    method: 'GET',
    path: '/reviews',
    handler: handler.getReviewsHandler,
    options: {
      auth: 'dateapp_jwt'
    },
  },
  {
    method: 'GET',
    path: '/spots',
    handler: handler.getSpotsHandler,
    options: {
      auth: 'dateapp_jwt'
    },
  },
  {
    method: 'GET',
    path: '/add/facility',
    handler: handler.getFacilityHandler,
  },
  {
    method: 'GET',
    path: '/add/label',
    handler: handler.getLabelHandler,
  },
  {
    method: 'GET',
    path: '/add/region',
    handler: handler.getRegionHandler,
  },
  {
    method: 'GET',
    path: '/add/area/{id}',
    handler: handler.getAreaHandler,
  },
]

module.exports = routes;
