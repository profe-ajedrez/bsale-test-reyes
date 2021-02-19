/**
 * models/db.js
 * 
 * Helpers para la conección a mysql
 */
"use strict";

const mysql = require("mysql");

/**
 * getPromisedConnection
 * 
 * Retorna una promesa de la connección a BD
 *
 * @param {Object} config
 * @return Promise 
 */
const getPromisedConnection = (config) => {
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

    conn.on('error', (err) => {
      console.log(err);
    });
  });  
};


/**
 * Query
 * 
 * Retorna una promesa de la consulta definida en parametro sql
 *
 * @param {Mysql} conn
 * @param {String} sql
 * @param {Array} args
 * 
 * @return Promise 
 */
const query = (conn, sql, args) => {
  return new Promise((resolve, reject) => {
    conn.query(sql, args, (err, rows) => {

      if (err) return reject(err);
      resolve(rows);
    });
  });
};


/**
 * autoclosedQuery
 *
 * Espera por la respuesta de query(), y al recibirla cierra la conección a BD 
 * 
 * @param {Mysql} conn
 * @param {String} sql
 * @param {Array} args
 * 
 * @return Array 
 */
const autoclosedQuery = async (conn, sql, args) => {
  const result = await query(conn, sql, args);
  conn.end((err) => {
    console.log(err);
  });
  return result;
};



module.exports = { query, autoclosedQuery, getConnection: getPromisedConnection };
