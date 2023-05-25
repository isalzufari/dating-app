require('dotenv').config();

const Hapi = require('@hapi/hapi');

// JWT
const Jwt = require('@hapi/jwt');

// Static Files
const Path = require('path');
const Inert = require('@hapi/inert');

const ClientError = require('./exceptions/ClientError');

const users = require('./api/users');
const UsersService = require('./services/mysql/UsersService');

const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/mysql/AuthenticationsService');
const TokenManager = require('./utils/TokenManager');

const spot = require('./api/spot');
const SpotService = require('./services/mysql/SpotService');

const review = require('./api/reviews')
const ReviewService = require('./services/mysql/ReviewService');

const location = require('./api/locations');
const LocationService = require('./services/mysql/LocationService');

const facility = require('./api/facility');
const FacilityService = require('./services/mysql/FacilityService');

const init = async () => {
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const spotService = new SpotService();
  const reviewService = new ReviewService();
  const locationService = new LocationService();
  const facilityService = new FacilityService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: Inert
    },
    {
      plugin: Jwt
    }
  ]);

  server.auth.strategy('dateapp_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      }
    }),
  });

  server.route({
    method: 'GET',
    path: '/images/{param*}',
    handler: {
      directory: {
        path: Path.resolve('./public/images'),
      }
    }
  });

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    // console.log(response);

    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return response.continue || response;
  });

  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
      },
      routes: {
        prefix: '/users'
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
      },
      routes: {
        prefix: '/authentications'
      }
    },
    {
      plugin: spot,
      options: {
        spotService,
        reviewService,
        facilityService,
        locationService
      },
      routes: {
        prefix: '/spot'
      },
    },
    {
      plugin: review,
      options: {
        reviewService,
        spotService
      },
      routes: {
        prefix: '/reviews'
      },
    },
    {
      plugin: location,
      options: {
        service: locationService,
      },
      routes: {
        prefix: '/location'
      }
    },
    {
      plugin: facility,
      options: {
        service: facilityService,
      },
      routes: {
        prefix: '/facility'
      }
    }
  ]
  );

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
}

init();