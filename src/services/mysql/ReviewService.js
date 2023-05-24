const InvariantError = require('../../exceptions/InvariantError');
const pool = require('./conn');
const isBase64 = require('is-base64');
const base64Img = require('base64-img');

class ReviewService {
  constructor() {
    this._pool = pool.promise();
  }

  async base64ToImg(imageBase64) {
    return new Promise((resolve, reject) => {
      if (!isBase64(imageBase64, { mimeRequired: true })) {
        throw new InvariantError('Review gagal ditambahkan: Invalid base64')
      }

      base64Img.img(imageBase64, './public/images', Date.now(), async (err, filepath) => {
        if (err) {
          reject(err);
          throw new InvariantError('Review gagal ditambahkan: base64Img')
        }

        const filename = filepath.split("\\").pop().split("/").pop();
        resolve(filename);
      });
    })
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

    console.log(result);

    if (result.length > 0) {
      throw new InvariantError('Review gagal ditambahkan: verifyNewReview');
    }
  }

  async addReview({ id_user, id_spot, image, rating, review }) {
    await this.verifyNewReview(id_user, id_spot);
    const filename = await this.base64ToImg(image);
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
      text: 'SELECT * FROM reviews WHERE `id_spot` = ?',
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
