const postUserHandler = (request, h) => {
  const response = h.response({
    status: 'success',
    message: 'User berhasil ditambahkan'
  });
  response.code(201);
  return response;
}

const getUserByIdHandler = (request, h) => {
  const { id } = request.params;
  const response = h.response({
    status: 'success',
    data: id
  });
  response.code(201);
  return response;
}

module.exports = {
  postUserHandler,
  getUserByIdHandler
};
