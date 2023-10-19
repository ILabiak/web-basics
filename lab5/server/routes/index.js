'use strict';

const userController = require('../db/controllers').user;

async function routes(fastify /*, options*/) {
  /* User Routes */
  fastify.post('/signup', userController.add);
  fastify.post('/login', userController.login);
  fastify.delete('/user/:id', userController.delete);
  fastify.get('/users', userController.list);
}

module.exports = routes;
