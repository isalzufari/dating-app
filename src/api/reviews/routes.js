const routes = (handler) => [
  {
    method: 'POST',
    path: '/',
    handler: handler.postReviewHandler,
    options: {
      auth: 'dateapp_jwt'
    },
  },
];

module.exports = routes;
