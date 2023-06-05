const routes = (handler) => [
  {
    method: 'GET',
    path: '/',
    handler: handler.getReviewByIdHandler,
    options: {
      auth: 'dateapp_jwt'
    },
  },
  {
    method: 'POST',
    path: '/',
    handler: handler.postReviewHandler,
    options: {
      auth: 'dateapp_jwt'
    },
  },
  {
    method: 'PUT',
    path: '/',
    handler: handler.updateReviewHandler,
    options: {
      auth: 'dateapp_jwt'
    },
  },
  {
    method: 'DELETE',
    path: '/',
    handler: handler.deleteReviewHandler,
    options: {
      auth: 'dateapp_jwt'
    },
  }
];

module.exports = routes;
