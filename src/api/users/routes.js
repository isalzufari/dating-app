const routes = (handler) => [
  {
    method: 'GET',
    path: '/',
    handler: handler.getUserByIdHandler,
    options: {
      auth: 'dateapp_jwt'
    }
  },
  {
    method: 'PUT',
    path: '/',
    handler: handler.updateUserByIdHandler,
    options: {
      auth: 'dateapp_jwt'
    }
  },
  {
    method: 'DELETE',
    path: '/',
    handler: handler.deleteUserByIdHandler,
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
