'use strict';
const server = require('./server');
require('dotenv').config();

module.exports = {
  URL: process.env.DATABASE_URL,
  HOST: process.env.DATABASEHOST,
  USER: process.env.DATABASEUSER,
  PASSWORD: process.env.DATABASEPASSWORD,
  DB: process.env.DATABASE,
  ssl: true,
  dialect: 'postgres',
  pool: {
    max: 50,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};