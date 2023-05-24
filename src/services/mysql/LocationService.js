const InvariantError = require("../../exceptions/InvariantError");
const pool = require("./conn");

class LocationService {
  constructor() {
    this._pool = pool.promise();
  }

  async verifyRegion(id) {
    const query = {
      text: 'SELECT id FROM region WHERE id = ?',
      values: [id]
    }

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    if (!result.length > 0) {
      throw new InvariantError('Region tidak tersedia: verifyRegion')
    }
  }

  async getRegion() {
    const [result, fields] = await this._pool.query(
      'SELECT id as id_region, name FROM region'
    )

    return result;
  }

  async getLocation({ id_region }) {
    await this.verifyRegion(id_region);

    const query = {
      text: `SELECT locations.id as id_location, area.name AS area
      FROM locations INNER JOIN area ON locations.id_area = area.id 
      INNER JOIN region ON locations.id_region = region.id 
      WHERE region.id = ?`,
      values: [id_region]
    }

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    return result;
  }

  async getSpotByIdLocation({ id }) {
    const query = {
      text: `SELECT spot.name, spot.slug, spot.desc, spot.price, area.name as area
      FROM spot 
      INNER JOIN locations ON spot.id_location = locations.id
      INNER JOIN area ON locations.id_area = area.id 
      WHERE locations.id = ?`,
      values: [id]
    }

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );
    return result;
  }
}

module.exports = LocationService;
