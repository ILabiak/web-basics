'use strict';

require('dotenv').config();

const creds = {
  development: {
    username: process.env.DBUSER || 'postgres',
    password: process.env.DBPASSWORD || 'qwerty334455',
    database: process.env.DATABASE || 'weblabs',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgresql',
    seedersTimestamps: true,
    logging: false,
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgresql',
    seedersTimestamps: true,
    logging: false,
  },
  production: {
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
    host: '127.0.0.1',
    dialect: 'postgresql',
    seedersTimestamps: true,
    logging: false,
  },
};

module.exports = creds;
