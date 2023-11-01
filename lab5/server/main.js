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


// somemail@gmail.com password123 $2b$10$WgTmn9X5LhY3iFucGGyQy.jEAIlrnnbi17iN45j5CAfVs989Qb7Ju
// gmail@gmail.com qwerty123123 $2b$10$Z2RmViwtqBR8A47ltX9GPONk9xVXd9.WNp13/uKUsJWI8FpBocGmG
// admin@gmail.com pass123123 $2b$10$Hxw64GnGCVfb.AvKCTpK9eERNDXSXcifSNhTCUfhET/6MpbTh6GNq