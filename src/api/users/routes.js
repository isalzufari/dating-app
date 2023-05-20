const routes = (handler) => [
  {
    method: 'POST',
    path: '/',
    handler: handler.postUserHandler,
  },
  {
    method: 'GET',
    path: '/{id}',
    handler: handler.getUserByIdHandler,
  },
];

module.exports = routes;
