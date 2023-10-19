'use strict';

const db = require('./models');

async function testConnection() {
  try {
    await db.sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

//test connection
(async () => {
  await testConnection();
})();
