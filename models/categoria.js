/**
 * models/categoria.js
 */
"use strict";

const config = require("../config/config");
const { query } = require("./db");

module.exports.getAll = (conn) => {
  return query(conn, "SELECT id, `name` FROM category ORDER BY `name` ASC");
};
