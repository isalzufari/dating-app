class ReviewHandler {
  constructor(service) {
    this._service = service;

    this.postReviewHandler = this.postReviewHandler.bind(this);
  }

  async postReviewHandler(request, h) {
    const id_user = 36;
    const { id_spot, image, rating, review } = request.payload;

    const reviewId = await this._service.addReview({ id_user, id_spot, image, rating, review })

    const response = h.response({
      status: 'success',
      message: 'Review berhasil ditambahkan',
      data: reviewId,
    });
    response.code(201);
    return response;
  }
}

module.exports = ReviewHandler;