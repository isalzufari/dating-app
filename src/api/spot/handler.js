class SpotHandler {
  constructor(spotService, reviewService, facilityService, locationService) {
    this._spotService = spotService;
    this._reviewService = reviewService;
    this._facilityService = facilityService;
    this._locationService = locationService;

    this.getSpotsHandler = this.getSpotsHandler.bind(this);
    this.postSpotHandler = this.postSpotHandler.bind(this);
    this.deleteSpotHandler = this.deleteSpotHandler.bind(this);
    this.updateSpotHandler = this.updateSpotHandler.bind(this);
    this.getSpotBySlugHandler = this.getSpotBySlugHandler.bind(this);
    this.getSpotByRegionHandler = this.getSpotByRegionHandler.bind(this);
  }

  async getSpotsHandler(request) {
    const spots = await this._spotService.getSpots();

    const mappedSpot = spots.map((spot) => ({
      ...spot,
      image: `http://${request.headers.host}/${spot.image}`
    }))

    return ({
      status: 'success',
      data: mappedSpot
    })
  }

  async postSpotHandler(request, h) {
    const { id: id_user } = request.auth.credentials;
    const { name, image, desc, price, facility, id_location, id_label } = request.payload;

    const spotId = await this._spotService.addSpot({ id_user, name, image, desc, price, facility, id_location, id_label })

    const response = h.response({
      status: 'success',
      message: 'Spot berhasil ditambahkan',
      data: spotId,
    });
    response.code(201);
    return response;
  }

  async updateSpotHandler(request, h) {
    const { id: id_user } = request.auth.credentials;
    const { id_spot, name, image, desc, price, facility, id_location, id_label } = request.payload;

    await this._spotService.updateSpot({
      id_user, id_spot, name, image, desc, price, facility, id_location, id_label
    });

    const response = h.response({
      status: 'success',
      message: 'Spot berhasil diubah'
    });
    response.code(201);
    return response;
  }

  async deleteSpotHandler(request, h) {
    const { id: id_user } = request.auth.credentials;
    const { id_spot } = request.payload;

    await this._spotService.deleteSpot({ id_user, id_spot });

    const response = h.response({
      status: 'success',
      message: 'Spot berhasil dihapus'
    });
    response.code(201);
    return response;
  }

  async getSpotBySlugHandler(request, h) {
    const id_user = request?.auth?.credentials?.id;
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
      image: `http://${request.headers.host}/${spots.image}`,
      facilities: facilities.map((facility) => ({
        ...facility,
      })),
      reviews: reviews.map((review) => ({
        name: review.name,
        status: review.status,
        id_review: review.id_review,
        rating: review.rating,
        review: review.review,
        isLoggedIn: review.id_user === id_user ? true : false,
        imgProfile: review.imgProfile ? `http://${request.headers.host}/${review.imgProfile}` : 'https://www.mtn.ng/wp-content/uploads/2022/08/avatar.png',
        image: `http://${request.headers.host}/${review.image}`
      })),
      arounds: aroundLocation.map((around) => ({
        ...around,
        image: `http://${request.headers.host}/${around.image}`
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
      image: `http://${request.headers.host}/${spot.image}`,
    }));

    return ({
      status: 'success',
      data: mappedSpot
    })
  }
}

module.exports = SpotHandler;
