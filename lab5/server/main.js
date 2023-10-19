'use strict';

require('dotenv').config();

const fastify = require('fastify')({
//   logger: true,
});

fastify.register(require('@fastify/cors'), {
  origin: true,
  credentials: true,
});

fastify.register(require('./routes'));

// Run the server!
fastify.listen({ port: 3005 }, (err) => {
  if (err) throw err;
  console.log('Server listening on port 3005')
});

module.exports = fastify;
