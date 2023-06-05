const pool = require('./conn');
const bcrypt = require('bcrypt');
const InvariantError = require('../../exceptions/InvariantError');
const AuthenticationError = require('../../exceptions/AuthenticationError');
const { base64ToImg } = require('../../utils');

class UsersService {
  constructor() {
    this._pool = pool.promise();
  }

  async getUsers() {
    const query = {
      text: 'SELECT * FROM `users`'
    };

    const [result, fields] = await this._pool.query(
      query.text
    );

    return result;
  }

  async getUserById(id) {
    const query = {
      text: 'SELECT name, email, image, status FROM `users` WHERE `id` = ?',
      values: [id],
    };

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    return result;
  }

  async addUser({ name, email, password }) {
    await this.verifyNewEmail(email);

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = {
      text: 'INSERT INTO users (name, email, password, status) VALUES(?, ?, ?, ?)',
      values: [name, email, hashedPassword, 0],
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

  async updateUser({ id, name, image, old_password, new_password }) {
    await this.verifyPassword(id, old_password);
    const hashedPassword = await bcrypt.hash(new_password, 10);
    const filename = await base64ToImg(image);
    const locationImg = `images/${filename}`;

    const query = {
      text: 'UPDATE `users` SET name=?, image=?, password=? WHERE id=?',
      values: [name, locationImg, hashedPassword, id],
    }

    const [result, fields] = await this._pool.query(query.text, query.values);

    return result;
  }

  async deleteUser({ id, old_password }) {
    await this.verifyPassword(id, old_password);
    const query = {
      text: 'UPDATE `users` SET is_deleted = ? WHERE id=?',
      values: [1, id],
    }

    await this._pool.query(query.text, query.values);

    return true;
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

  async verifyPassword(id, old_password) {
    const query = {
      text: 'SELECT password FROM `users` WHERE id = ?',
      values: [id],
    };

    const [result, fields] = await this._pool.query(query.text, query.values);

    if (!result.length > 0) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah');
    }

    const { password: hashedPassword } = result[0];
    const match = await bcrypt.compare(old_password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Kredensial yang anda berikan salah tidak match');
    }

    return match;
  }

  async verifyUserCredential(email, password) {
    const query = {
      text: 'SELECT id, password FROM `users` WHERE email = ? AND NOT is_deleted=1',
      values: [email],
    };

    const [result, fields] = await this._pool.query(
      query.text,
      query.values,
    );

    if (!result.length > 0) {
      throw new AuthenticationError('Kredensial yang Anda berikan salah atau sudahh di deleted');
    }

    const { id, password: hashedPassword } = result[0];
    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new AuthenticationError('Kredensial yang anda berikan salah tidak match');
    }

    return id;
  }
}

module.exports = UsersService;
