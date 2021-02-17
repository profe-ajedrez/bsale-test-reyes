/**
 * config.js
 * 
 * Expone configuración de la app
 */

'use strict';

const ENV_SOURCE = `${__dirname}/config_dev.env`;
const process = require('process');
const dotenv = require('dotenv');

dotenv.config({ path: ENV_SOURCE});

const config = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  username: process.env.USERNAME,
  host: process.env.DATABASE,
  password: process.env.PASSWORD,
  db: process.env.DBNAME
};

module.exports = config;
