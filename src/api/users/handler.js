class UsersHandler {
  constructor(service) {
    this._service = service;

    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
  }

  async postUserHandler(request, h) {
    const { name, email, password, status } = request.payload;

    const userId = await this._service.addUser({ name, email, password, status });

    const response = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: userId,
    });
    response.code(201);
    return response;
  }

  async getUserByIdHandler(request, h) {
    const { id } = request.params;
    const user = await this._service.getUserById(id);

    // console.log(user);

    const response = h.response({
      status: 'success',
      data: user,
    });
    response.code(201);
    return response;
  }
}

module.exports = UsersHandler;
