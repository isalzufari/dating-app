class FacilityHandler {
  constructor(service) {
    this._service = service;

    this.getListFacilityByIdSpotHandler = this.getListFacilityByIdSpotHandler.bind(this);
  }

  async getListFacilityByIdSpotHandler(request, h) {
    const { id } = request.params;

    const facilityBySpot = await this._service.getListFacilityByIdSpot({ id });

    return ({
      status: 'success',
      data: facilityBySpot,
    });
  }
}

module.exports = FacilityHandler;
