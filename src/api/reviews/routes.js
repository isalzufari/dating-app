const routes = (handler) => [
  {
    method: 'POST',
    path: '/',
    handler: handler.postReviewHandler,
  },
];

module.exports = routes;
