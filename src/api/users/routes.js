const routes = (handler) => [
  // {
  //   method: 'GET',
  //   path: '/',
  //   handler: handler.getUsersHandler,
  // },
  {
    method: 'GET',
    path: '/',
    handler: handler.getUserByIdHandler,
    options: {
      auth: 'dateapp_jwt'
    }
  },
  {
    method: 'POST',
    path: '/',
    handler: handler.postUserHandler,
  },
];

module.exports = routes;
