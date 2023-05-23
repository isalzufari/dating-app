const pool = require('./conn');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const AuthenticationError = require('../../exceptions/AuthenticationError');

class UsersService {
  constructor() {
    this._pool = pool.promise();
  }

  async addUser({ name, email, password, status }) {
    await this.verifyNewEmail(email);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const query = {
      text: 'INSERT INTO users (name, email, password, status) VALUES(?, ?, ?, ?)',
      values: [name, email, hashedPassword, status],
    };

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    if (!result.insertId) {
      throw new InvariantError('User gagal ditambahkan: addUser');
    }

    return result.insertId;
  }

  async verifyNewEmail(email) {
    const query = {
      text: 'SELECT email FROM `users` WHERE `email` = ?',
      values: [email],
    };

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    if (result.length > 0) {
      throw new InvariantError('User gagal ditambahkan: verifyNewEmail');
    }
  }

  async getUserById(id) {
    const query = {
      text: 'SELECT * FROM `users` WHERE `id` = ?',
      values: [id],
    };

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    return result;
  }

  async verifyUserCredential(email, password) {
    const query = {
      text: 'SELECT id, password FROM `users` WHERE email = ?',
      values: [email],
    };

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    if (!result.length > 0) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    const { id, password: hashedPassword } = result[0];
    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Kredensial yang anda berikan salah match');
    }

    return id;
  }
}

module.exports = UsersService;
