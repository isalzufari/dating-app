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

  async getAllReviewByIdSpot({ id }) {
    const query = {
      text: `SELECT users.id as id_user, users.name, users.status, users.image as imgProfile, reviews.id as id_review, reviews.image, reviews.rating, reviews.review
      FROM reviews 
      INNER JOIN users ON reviews.id_user = users.id 
      WHERE id_spot = ? ORDER BY status DESC`,
      values: [id]
    }

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    return result;
  }

  async getReviewByIdUser({ id }) {
    const query = {
      text: `SELECT reviews.id, reviews.image as image_reviews, reviews.rating, review, spot.name, spot.slug FROM reviews 
      INNER JOIN spot ON reviews.id_spot = spot.id
      WHERE id_user = ?`,
      values: [id],
    };

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    return result;
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

  async editReview({ id_user, id_review, image, rating, review }) {
    const filename = await base64ToImg(image);
    const locationImg = `images/${filename}`;

    const query = {
      text: 'UPDATE reviews SET image = ?, rating = ?, review = ? WHERE id = ? AND id_user = ?',
      values: [locationImg, rating, review, id_review, id_user],
    }

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    return result
  }

  async deleteReview({ id_review, id_user }) {
    const query = {
      text: 'DELETE FROM reviews WHERE id = ? AND id_user = ?',
      values: [id_review, id_user],
    }

    const [results, fields] = await this._pool.query(
      query.text,
      query.values,
    );
  }

  async getReviewByUserLoggedInById({ id }) {
    const query = {
      text: `SELECT spot.id as id_spot, spot.name, spot.slug, reviews.image, reviews.id as id_review, reviews.rating, reviews.review FROM reviews
      INNER JOIN spot ON reviews.id_spot = spot.id
      WHERE reviews.id_user = ?
      `,
      values: [id]
    }

    const [result, fields] = await this._pool.query(query.text, query.values);

    return result;
  }

  async getTotalReviewsFromSpotById({ id }) {
    const query = {
      text: 'SELECT COUNT(id) as total FROM reviews WHERE id_spot = ?',
      values: [id]
    }

    const [result, fields] = await this._pool.query(query.text, query.values);

    return result[0];
  }
}

module.exports = ReviewService;
