const Hapi = require('@hapi/hapi');
const routes = require('./api/users');
const users = require('./api/users');

const init = async () => {
  const server = Hapi.server({
    port: 9001,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register(
    {
      plugin: users,
      routes: {
        prefix: '/users'
      },
    }
  );

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
}

init();