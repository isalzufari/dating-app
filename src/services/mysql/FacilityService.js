const pool = require('./conn');

class FacilityService {
  constructor() {
    this._pool = pool.promise();
  }

  async getListFacility() {
    const query = {
      text: 'SELECT * FROM facility'
    }

    const [result, fields] = await this._pool.query(query.text);

    return result;
  }

  async getListFacilityByIdSpot({ id }) {
    const query = {
      text: `SELECT name 
      FROM list_facility 
      INNER JOIN facility 
      ON list_facility.id_facility = facility.id
      WHERE id_spot = ?`,
      values: [id]
    }

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    )

    return result;
  }
}

module.exports = FacilityService;
