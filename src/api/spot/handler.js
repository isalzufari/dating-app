const { compareSync } = require("bcrypt");
const mapSpotModel = require('../../utils/MappedSpot');

class SpotHandler {
  constructor(spotService, reviewService, facilityService) {
    this._spotService = spotService;
    this._reviewService = reviewService;
    this._facilityService = facilityService;

    this.getSpotsHandler = this.getSpotsHandler.bind(this);
    this.postSpotHandler = this.postSpotHandler.bind(this);
    this.getSpotBySlugHandler = this.getSpotBySlugHandler.bind(this);
  }

  async getSpotsHandler() {
    const spots = await this._spotService.getSpots();

    return ({
      status: 'success',
      data: spots
    })
  }

  async postSpotHandler(request, h) {
    const { name, desc, price, facility, id_location } = request.payload;

    const spotId = await this._spotService.addSpot({ name, desc, price, facility, id_location })

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
    const id_spots = spots.id;
    const reviews = await this._reviewService.getAllReviewByIdSpot({ id: id_spots });
    const facilities = await this._facilityService.getListFacilityByIdSpot({ id: id_spots });

    // let sumRating = 0;
    // let countId = 0;
    // reviews.map((e, i) => {
    //   sumRating += e.rating;
    //   countId = i + 1;
    //   console.log(i + 1);
    // });
    // console.log(countId);
    // console.log('Avg' + (sumRating / countId))

    const mappedSpot = {
      ...spots,
      facilities: facilities.map((facility) => ({
        ...facility,
      })),
      reviews: reviews.map((review) => ({
        ...review,
        image: `http://localhost:9001/${review.image}`
      }))
    }

    const response = h.response({
      status: 'success',
      data: mappedSpot
    });
    response.code(201);
    return response;
  }
}

module.exports = SpotHandler;
