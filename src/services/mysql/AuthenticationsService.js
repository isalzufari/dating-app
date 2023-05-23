const pool = require('./conn');
const InvariantError = require('../../exceptions/InvariantError');

class AuthenticationsService {
  constructor() {
    this._pool = pool.promise();
  }

  async addRefreshToken(token) {
    const query = {
      text: 'INSERT INTO authentications (token) VALUES(?)',
      values: [token],
    };

    const [result, field] = await this._pool.query(
      query.text,
      query.values,
    );
  }

  async verifyRefreshToken(token) {
    const query = {
      text: 'SELECT `token` FROM `authentications` WHERE `token` = ?',
      values: [token],
    };

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    if (!result.length > 0) {
      throw new InvariantError('Refresh token tidak valid (Auth Service)');
    }
  }

  async deleteRefreshToken(token) {
    await this.verifyRefreshToken(token);

    const query = {
      text: 'DELETE FROM `authentications` WHERE `token` = ?',
      values: [token],
    };

    await this._pool.query(
      query.text,
      query.values,
    );
  }
}

module.exports = AuthenticationsService;
