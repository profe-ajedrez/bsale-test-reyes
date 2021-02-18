'use strict';

const mysql = require('mysql');
const config = require('./config');


const conn = mysql.createConnection({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.db,
});

conn.connect((err) => {
  if (!err) {
    console.log("Connected");
  } else {
    console.log("Connection Failed");
  }
});

module.exports = conn;