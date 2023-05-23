class SpotHandler {
  constructor(service) {
    this._service = service;

    this.postSpotHandler = this.postSpotHandler.bind(this);
  }

  async postSpotHandler(request, h) {
    const { name, desc, price, facility, id_location } = request.payload;

    const spotId = await this._service.addSpot({ name, desc, price, facility, id_location })

    const response = h.response({
      status: 'success',
      message: 'Spot berhasil ditambahkan',
      data: spotId,
    });
    response.code(201);
    return response;
  }
}

module.exports = SpotHandler;
