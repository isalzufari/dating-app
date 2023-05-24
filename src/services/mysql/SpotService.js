const InvariantError = require('../../exceptions/InvariantError');
const pool = require('./conn');

class SpotService {
  constructor() {
    this._pool = pool.promise();
  }

  async convertToSlug(name) {
    return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  }

  async verifyNewName(name) {
    const query = {
      text: 'SELECT name FROM `spot` WHERE `name` = ?',
      values: [name],
    };

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    if (result.length > 0) {
      throw new InvariantError('Spot gagal ditambahkan: verifyNewName');
    }
  }

  async addListSpot(id_user, id_spot) {
    const query = {
      text: 'INSERT INTO list_spot (id_user, id_spot) VALUES(?, ?)',
      values: [id_user, id_spot]
    };

    await this._pool.query(
      query.text,
      query.values,
    );
  }

  async addFacility(id_spot, id_facility) {
    const query = {
      text: 'INSERT INTO list_facility (id_spot, id_facility) VALUES(?, ?)',
      values: [id_spot, id_facility]
    };

    await this._pool.query(
      query.text,
      query.values,
    );
  }

  async addSpot({ name, desc, price, facility, id_location }) {
    await this.verifyNewName(name);
    const slug = await this.convertToSlug(name);

    const query = {
      text: 'INSERT INTO spot (name, slug, `desc`, price, id_location) VALUES(?, ?, ?, ?, ?)',
      values: [name, slug, desc, price, id_location]
    };

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    if (!result.insertId) {
      throw new InvariantError('Spot gagal ditambahkan: addSpot');
    }

    const id_spot = result.insertId;
    // Add Facility
    facility.forEach((id_facility) => {
      this.addFacility(id_spot, id_facility)
    });
    // Add Users To Have Spot
    this.addListSpot(36, id_spot)

    return id_spot;
  }

  async getSpotBySlug({ slug }) {
    const query = {
      text: 'SELECT * FROM `spot` WHERE `slug` = ?',
      values: [slug],
    }

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    return result[0];
  }

  async getSpots() {
    const query = {
      text: 'SELECT * FROM `spot`',
    }

    const [result, fields] = await this._pool.query(
      query.text,
    );

    return result;
  }
}

module.exports = SpotService;
