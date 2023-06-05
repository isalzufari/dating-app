class AppHandler {
  constructor(spotService, reviewService, facilityService, locationService) {
    this._spotService = spotService;
    this._reviewService = reviewService;
    this._facilityService = facilityService;
    this._locationService = locationService;

    this.getReviewsAndSpotsHandler = this.getReviewsAndSpotsHandler.bind(this);
    this.getReviewsHandler = this.getReviewsHandler.bind(this);
    this.getSpotsHandler = this.getSpotsHandler.bind(this);
    this.getFacilityHandler = this.getFacilityHandler.bind(this);
    this.getLabelHandler = this.getLabelHandler.bind(this);
    this.getRegionHandler = this.getRegionHandler.bind(this);
    this.getAreaHandler = this.getAreaHandler.bind(this);
  }

  async getReviewsAndSpotsHandler(request, h) {
    const { id } = request.auth.credentials;

    const spotByUserLoggedIn = await this._spotService.getSpotByUserLoggedInById({ id });
    const reviewByUserLoggedIn = await this._reviewService.getReviewByUserLoggedInById({ id });

    const response = h.response({
      status: 'success',
      data: {
        spots: spotByUserLoggedIn.map((spot) => ({
          ...spot,
          image: `http://${request.headers.host}/${spot.image}`
        })),
        reviews: reviewByUserLoggedIn.map((review) => ({
          ...review,
          image: `http://${request.headers.host}/${review.image}`
        }))
      },
    });
    response.code(201);
    return response;
  }

  async getReviewsHandler(request, h) {
    const { id } = request.auth.credentials;

    const reviewByUserLoggedIn = await this._reviewService.getReviewByUserLoggedInById({ id });

    const response = h.response({
      status: 'success',
      data: reviewByUserLoggedIn.map((review) => ({
        ...review,
        image: `http://${request.headers.host}/${review.image}`
      })),

    });
    response.code(201);
    return response;
  }

  async getSpotsHandler(request, h) {
    const { id } = request.auth.credentials;

    const spotByUserLoggedIn = await this._spotService.getSpotByUserLoggedInById({ id });

    const getTotalReviews = async (id) => {
      const totalReviewsFromSpot = await this._reviewService.getTotalReviewsFromSpotById({ id });
      return totalReviewsFromSpot.total;
    }

    const response = h.response({
      status: 'success',
      data: await Promise.all(spotByUserLoggedIn.map(async (spot) => ({
        ...spot,
        totalReview: await getTotalReviews(spot.id),
        image: `http://${request.headers.host}/${spot.image}`,
      }))),
    });
    response.code(201);
    return response;
  }

  async getFacilityHandler(request, h) {
    const facility = await this._facilityService.getListFacility();
    console.log(facility);

    const response = h.response({
      status: 'success',
      data: facility,
    });
    response.code(201);
    return response;
  }

  async getLabelHandler(request, h) {
    const label = await this._spotService.getLabelSpot();

    const response = h.response({
      status: 'success',
      data: label,
    });
    response.code(201);
    return response;
  }

  async getRegionHandler(request, h) {
    const regions = await this._locationService.getRegion();

    const response = h.response({
      status: 'success',
      data: regions,
    });
    response.code(201);
    return response;
  }

  async getAreaHandler(request, h) {
    const { id } = request.params;

    const areas = await this._locationService.getLocation({ id_region: id });

    const response = h.response({
      status: 'success',
      data: areas,
    });
    response.code(201);
    return response;

  }
}

module.exports = AppHandler;
