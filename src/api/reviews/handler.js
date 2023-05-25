class ReviewHandler {
  constructor(reviewService, spotService) {
    this._reviewService = reviewService;
    this._spotService = spotService;

    this.postReviewHandler = this.postReviewHandler.bind(this);
  }

  async postReviewHandler(request, h) {
    const { id: id_user } = request.auth.credentials;
    const { id_spot, image, rating, review } = request.payload;

    const reviewId = await this._reviewService.addReview({ id_user, id_spot, image, rating, review })
    const avgRating = await this._reviewService.getAvgReviewsFromSpot({ id: id_spot });
    await this._spotService.updateRatingByIdSpot({ avgRating, id: id_spot });

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