class ReviewHandler {
  constructor(reviewService, spotService) {
    this._reviewService = reviewService;
    this._spotService = spotService;

    this.getReviewByIdHandler = this.getReviewByIdHandler.bind(this);
    this.postReviewHandler = this.postReviewHandler.bind(this);
    this.updateReviewHandler = this.updateReviewHandler.bind(this);
    this.deleteReviewHandler = this.deleteReviewHandler.bind(this);
  }

  async getReviewByIdHandler(request, h) {
    const { id } = request.auth.credentials;
    const reviews = await this._reviewService.getReviewByIdUser({ id });

    // console.log(reviews);

    const response = h.response({
      status: 'success',
      data: reviews,
    });
    response.code(201);
    return response;
  }

  async postReviewHandler(request, h) {
    const { id: id_user } = request.auth.credentials;
    const { id_spot, image, rating, review } = request.payload;

    const reviewId = await this._reviewService.addReview({ id_user, id_spot, image, rating, review });
    const avgRating = await this._reviewService.getAvgReviewsFromSpot({ id: id_spot });
    await this._spotService.updateRatingByIdSpot({ avgRating, id: id_spot });

    console.log(avgRating);

    const response = h.response({
      status: 'success',
      message: 'Review berhasil ditambahkan',
      data: reviewId,
    });
    response.code(201);
    return response;
  }

  async updateReviewHandler(request, h) {
    const { id: id_user } = request.auth.credentials;
    const { id_spot, id_review, image, rating, review } = request.payload;

    console.log(id_spot);

    await this._reviewService.editReview({ id_user, id_review, image, rating, review });
    const avgRating = await this._reviewService.getAvgReviewsFromSpot({ id: id_spot });
    await this._spotService.updateRatingByIdSpot({ avgRating, id: id_spot });

    console.log(avgRating);

    const response = h.response({
      status: 'success',
      message: 'Review berhasil diperbarui'
    });
    response.code(201);
    return response;
  }

  async deleteReviewHandler(request, h) {
    const { id: id_user } = request.auth.credentials;
    const { id_review, id_spot } = request.payload;

    await this._reviewService.deleteReview({ id_review, id_user });
    const avgRating = await this._reviewService.getAvgReviewsFromSpot({ id: id_spot });
    await this._spotService.updateRatingByIdSpot({ avgRating, id: id_spot });

    console.log(avgRating);

    const response = h.response({
      status: 'success',
      message: 'Review berhasil dihapus'
    });
    response.code(201);
    return response;
  }
}

module.exports = ReviewHandler;