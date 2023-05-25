const InvariantError = require('../../exceptions/InvariantError');
const pool = require('./conn');
const { base64ToImg } = require('../../utils');

class ReviewService {
  constructor() {
    this._pool = pool.promise();
  }

  async verifyNewReview(id_user, id_spot) {
    const query = {
      text: 'SELECT id_user FROM `reviews` WHERE `id_user` = ? AND `id_spot` = ?',
      values: [id_user, id_spot],
    };

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    if (result.length > 0) {
      throw new InvariantError('Review gagal ditambahkan: verifyNewReview');
    }
  }

  async getAvgReviewsFromSpot({ id }) {
    const query = {
      text: `SELECT 
        SUM(rating)/COUNT(id) as avg_rating
        FROM reviews
        WHERE id_spot = ?
      `,
      values: [id]
    }

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    const { avg_rating } = result[0];
    return avg_rating;
  }

  async addReview({ id_user, id_spot, image, rating, review }) {
    await this.verifyNewReview(id_user, id_spot);
    const filename = await base64ToImg(image);
    const locationImg = `images/${filename}`;

    const query = {
      text: 'INSERT INTO reviews (id_user, id_spot, `image`, rating, `review`) VALUES (?, ?, ?, ?, ?)',
      values: [id_user, id_spot, locationImg, rating, review]
    };

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    if (!result.insertId) {
      throw new InvariantError('Review gagal ditambahkan: adReview')
    }

    return result.insertId;
  }

  async getAllReviewByIdSpot({ id }) {
    const query = {
      text: `SELECT users.name, users.status, reviews.image, reviews.rating, reviews.review
      FROM reviews 
      INNER JOIN users ON reviews.id_user = users.id 
      WHERE id_spot = ?`,
      values: [id]
    }

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    return result;
  }
}

module.exports = ReviewService;
