const routes = (handler) => [
  {
    method: 'POST',
    path: '/',
    handler: handler.postAuthenticationHandler,
  },
  {
    method: 'PUT',
    path: '/',
    handler: handler.putAuthenticationHandler,
  },
  {
    method: 'DELETE',
    path: '/',
    handler: handler.deleteAuthenticationHandler,
  }
]

module.exports = routes;
