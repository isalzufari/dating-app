class UsersHandler {
  constructor(service) {
    this._service = service;

    this.getUsersHandler = this.getUsersHandler.bind(this);
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
    this.updateUserByIdHandler = this.updateUserByIdHandler.bind(this);
    this.deleteUserByIdHandler = this.deleteUserByIdHandler.bind(this);
    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async getUsersHandler() {
    const users = await this._service.getUsers();

    return ({
      status: 'success',
      data: users,
    })
  }

  async getUserByIdHandler(request, h) {
    const { id } = request.auth.credentials;
    const user = await this._service.getUserById(id);

    const mappedUser = user.map((u) => ({
      ...u,
      image: u.image ? `http://${request.headers.host}/${u.image}` : 'https://www.mtn.ng/wp-content/uploads/2022/08/avatar.png'
    }))

    const response = h.response({
      status: 'success',
      data: mappedUser[0],
    });
    response.code(201);
    return response;
  }

  async postUserHandler(request, h) {
    const { name, email, password } = request.payload;

    const userId = await this._service.addUser({ name, email, password });

    const response = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: userId,
    });
    response.code(201);
    return response;
  }

  async updateUserByIdHandler(request, h) {
    const { id } = request.auth.credentials;
    const { name, image, old_password, new_password } = request.payload;

    await this._service.updateUser({ id, name, image, old_password, new_password });

    const response = h.response({
      status: 'success',
      message: 'User berhasil diubah'
    });
    response.code(201);
    return response;
  }

  async deleteUserByIdHandler(request, h) {
    const { id } = request.auth.credentials;
    const { old_password } = request.payload;

    await this._service.deleteUser({ id, old_password });

    const response = h.response({
      status: 'success',
      message: 'User berhasil dihapus'
    });
    response.code(201);
    return response;
  }
}

module.exports = UsersHandler;
