/**
 * app.js
 * 
 * Inicializa la app y expone objeto principal.
 */

'use strict';

const express = require('express');
const app = express();
app.config = require(`${__dirname}/config/config`);

module.exports = { app, express };
