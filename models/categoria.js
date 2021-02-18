/**
 * models/categoria.js
 */
"use strict";

const config = require("../config/config");
const { autoclosedQuery } = require("./db");

module.exports.getAll = (conn) => {
  return autoclosedQuery(conn, "SELECT id, `name` FROM category ORDER BY `name` ASC");
};
