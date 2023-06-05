const InvariantError = require('../../exceptions/InvariantError');
const pool = require('./conn');
const { base64ToImg } = require('../../utils');

class SpotService {
  constructor() {
    this._pool = pool.promise();
  }

  async getLabelSpot() {
    const query = {
      text: 'SELECT * FROM label_spot',
    };

    const [result, fields] = await this._pool.query(query.text);

    return result;
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

  async deleteFacility(id_spot) {
    const query = {
      text: 'DELETE FROM list_facility WHERE id_spot = ?',
      values: [id_spot]
    };

    await this._pool.query(query.text, query.values);
  }

  async addSpot({ id_user, name, image, desc, price, facility, id_location, id_label }) {
    await this.verifyNewName(name);
    const filename = await base64ToImg(image);
    const locationImg = `images/${filename}`;
    const slug = await this.convertToSlug(name);

    const query = {
      text: 'INSERT INTO spot (name, slug, `image`, `desc`, price, id_location, id_label) VALUES(?, ?, ?, ?, ?, ?, ?)',
      values: [name, slug, locationImg, desc, price, id_location, id_label]
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
    this.addListSpot(id_user, id_spot)

    return id_spot;
  }

  async verifySpotUser({ id_user, id_spot }) {
    const query = {
      text: 'SELECT * FROM `list_spot` WHERE `id_user` = ? AND `id_spot` = ?',
      values: [id_user, id_spot],
    };

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    if (!result.length > 0) {
      throw new InvariantError('Spot ini bukan punya anda: verifySpotUser');
    }
  }

  async updateSpot({ id_user, id_spot, name, image, desc, price, facility, id_location, id_label }) {
    await this.verifySpotUser({ id_user, id_spot });
    const filename = await base64ToImg(image);
    const locationImg = `images/${filename}`;
    const slug = await this.convertToSlug(name);

    const query = {
      text: 'UPDATE spot SET name=?, slug=?, image=?, `desc`=?, price=?, id_location=?, id_label=? WHERE id=?',
      values: [name, slug, locationImg, desc, price, id_location, id_label, id_spot]
    };

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    console.log(result);

    // Updating many to many
    await this.deleteFacility(id_spot);
    for await (const id_facility of facility) {
      this.addFacility(id_spot, id_facility);
    }

    return result;
  }

  async deleteSpot({ id_user, id_spot }) {
    await this.verifySpotUser({ id_user, id_spot });
    const query = {
      text: 'DELETE FROM spot WHERE id = ?',
      values: [id_spot],
    }

    const [results, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    return results;
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
      text: `SELECT spot.name, spot.slug, spot.image, spot.desc, spot.price, area.name as area, label_spot.name as label
      FROM spot 
      INNER JOIN locations ON spot.id_location = locations.id
      INNER JOIN area ON locations.id_area = area.id
      INNER JOIN label_spot ON label_spot.id = spot.id_label`,
    }

    const [result, fields] = await this._pool.query(
      query.text,
    );

    return result;
  }

  async updateRatingByIdSpot({ avgRating, id }) {
    const query = {
      text: 'UPDATE `spot` SET rating = ? WHERE id = ?',
      values: [avgRating, id],
    };

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    return result;
  }

  async getSpotByRegion({ id }) {
    const query = {
      text: `SELECT spot.name, spot.slug, spot.image, spot.desc, spot.price, area.name as area, label_spot.name as label FROM spot 
      INNER JOIN locations ON spot.id_location = locations.id 
      INNER JOIN region ON locations.id_region = region.id 
      INNER JOIN area ON locations.id_area = area.id
      INNER JOIN label_spot ON label_spot.id = spot.id_label 
      WHERE region.id = ?`,
      values: [id],
    }

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    console.log(result);
    return result;
  }

  async getSpotByUserLoggedInById({ id }) {
    const query = {
      text: `SELECT spot.id, spot.name, spot.slug, spot.image, spot.desc, spot.price, spot.rating, spot.price, region.name as region, area.name as area
      FROM spot 
      INNER JOIN locations ON spot.id_location = locations.id
      INNER JOIN region ON locations.id_region = region.id
      INNER JOIN area ON locations.id_area = area.id
      INNER JOIN list_spot ON spot.id = list_spot.id_spot
      WHERE list_spot.id_user = ?`,
      values: [id]
    }

    try {
      const [result, fields] = await this._pool.query(query.text, query.values);
      return result;
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = SpotService;
