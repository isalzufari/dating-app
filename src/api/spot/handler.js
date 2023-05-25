class SpotHandler {
  constructor(spotService, reviewService, facilityService, locationService) {
    this._spotService = spotService;
    this._reviewService = reviewService;
    this._facilityService = facilityService;
    this._locationService = locationService;

    this.getSpotsHandler = this.getSpotsHandler.bind(this);
    this.postSpotHandler = this.postSpotHandler.bind(this);
    this.getSpotBySlugHandler = this.getSpotBySlugHandler.bind(this);
    this.getSpotByRegionHandler = this.getSpotByRegionHandler.bind(this);
  }

  async getSpotsHandler() {
    const spots = await this._spotService.getSpots();

    const mappedSpot = spots.map((spot) => ({
      ...spot,
      image: `http://localhost:9001/${spot.image}`
    }))

    return ({
      status: 'success',
      data: mappedSpot
    })
  }

  async postSpotHandler(request, h) {
    const { id: id_user } = request.auth.credentials;
    const { name, image, desc, price, facility, id_location } = request.payload;

    const spotId = await this._spotService.addSpot({ id_user, name, image, desc, price, facility, id_location })

    const response = h.response({
      status: 'success',
      message: 'Spot berhasil ditambahkan',
      data: spotId,
    });
    response.code(201);
    return response;
  }

  async getSpotBySlugHandler(request, h) {
    const { slug } = request.params;

    const spots = await this._spotService.getSpotBySlug({ slug });
    const { id, id_location } = spots;
    const reviews = await this._reviewService.getAllReviewByIdSpot({ id });
    const facilities = await this._facilityService.getListFacilityByIdSpot({ id });
    const location = await this._locationService.getLocationByIdLocation({ id: id_location });
    const aroundLocation = await this._locationService.getSpotAroundLocation({ id_location, id_spot: id });
    // let sumRating = 0;
    // let countId = 0;
    // reviews.map((e, i) => {
    //   sumRating += e.rating;
    //   countId = i + 1;
    //   console.log(i + 1);
    // });
    // console.log(countId);
    // console.log('Avg' + (sumRating / countId))

    // console.log(aroundLocation);

    const mappedSpot = {
      ...spots,
      location: location,
      image: `http://localhost:9001/${spots.image}`,
      facilities: facilities.map((facility) => ({
        ...facility,
      })),
      reviews: reviews.map((review) => ({
        ...review,
        image: `http://localhost:9001/${review.image}`
      })),
      arounds: aroundLocation.map((around) => ({
        ...around,
        image: `http://localhost:9001/${around.image}`
      })),
    }

    const response = h.response({
      status: 'success',
      data: mappedSpot
    });
    response.code(201);
    return response;
  }

  async getSpotByRegionHandler(request, h) {
    const { id } = request.params;

    const spots = await this._spotService.getSpotByRegion({ id });

    const mappedSpot = spots.map((spot) => ({
      ...spot,
      image: `http://localhost:9001/${spot.image}`,
    }));

    return ({
      status: 'success',
      data: mappedSpot
    })
  }
}

module.exports = SpotHandler;
