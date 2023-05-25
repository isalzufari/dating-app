class UsersHandler {
  constructor(service) {
    this._service = service;

    this.getUsersHandler = this.getUsersHandler.bind(this);
    this.getUserByIdHandler = this.getUserByIdHandler.bind(this);
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
    console.log(id);
    const user = await this._service.getUserById(id);

    const response = h.response({
      status: 'success',
      data: user,
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
}

module.exports = UsersHandler;
