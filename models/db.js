/**
 * models/db.js
 */
"use strict";

const mysql = require("mysql");

const getConnection = (config) => {
  return new Promise((resolve, reject) => {
    const conn = mysql.createConnection({
      host: config.host,
      user: config.username,  
      password: config.password,
      database: config.db,
    });

    conn.connect((err) => {
      if (!err) {
        console.log("Connected");
        resolve(conn);
      } else {
        console.log("Connection Failed");
        reject(err);
      }
    });
  });  
};



const query = (conn, sql, args) => {
  return new Promise((resolve, reject) => {
    conn.query(sql, args, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};


module.exports = { query, getConnection };
