class LocationHandler {
  constructor(service) {
    this._service = service;

    this.getAreaHandler = this.getAreaHandler.bind(this);
    this.getRegionHandler = this.getRegionHandler.bind(this);
    this.getSpotByLocationHandler = this.getSpotByLocationHandler.bind(this);
  }

  async getRegionHandler(request, h) {
    const region = await this._service.getRegion();

    return {
      status: 'success',
      data: region
    }
  }

  async getAreaHandler(request, h) {
    const { regions: id_region } = request.query;

    const location = await this._service.getLocation({ id_region });

    const response = h.response({
      status: 'success',
      data: location
    });
    response.code(201);
    return response;
  }

  async getSpotByLocationHandler(request, h) {
    const { id } = request.params;

    const spots = await this._service.getSpotByIdLocation({ id });
    const mappedSpot = spots.map((spot) => ({
      ...spot,
      image: `http://localhost:9001/${spot.image}`,
    }));

    const response = h.response({
      status: 'success',
      data: mappedSpot
    });
    response.code(201);
    return response;
  }
}

module.exports = LocationHandler;
