/**
 * models/productos.js
 */
'use strict';

const config = require('../config/config');
const {query, autoclosedQuery} = require('./db');

const baseQuery = 'SELECT p.id,p.`name`,p.url_image,p.price,p.discount,p.category as category_id, c.name AS category FROM product p';
const baseJoin = 'LEFT JOIN category c ON p.category=c.id'
const defaultSort = 'category';
const defaultOrder = 'ORDER BY %DEFAULT_SORT%, id ASC';

const getPaginationQuery = (limit, offset) => {
  let sql = '';

  if (!!limit) {
    sql = `LIMIT ${limit}`;
    sql += offset === null ? '' : ` OFFSET ${offset}`;
  }
  return sql;
};


const sortBy = (sorteredColumn) => {
  sorteredColumn = sorteredColumn || defaultSort;
  return defaultOrder.replace('%DEFAULT_SORT%', sorteredColumn);
};

const filterBy = (toFilter) => {
  if (!toFilter) {
    return '';
  }

  return 'WHERE (LOWER(p.`name`) LIKE ? OR LOWER(c.name) LIKE ?)'
};

const categorizedBy = (category, prevCondition) => {
  if (!!prevCondition) {
    return `${prevCondition} AND p.category = ?`;
  }
  return 'WHERE p.category = ?';
};


module.exports.getAll = (conn, sorteredColumn) => {    
  return autoclosedQuery(conn, `${baseQuery} ${baseJoin} ${sortBy(sorteredColumn)}`);    
};


module.exports.getPaginated = (conn, limit, offset, sorteredColumn) => {
  const paginationQuery = getPaginationQuery(limit, offset);
  const sql =  `${baseQuery} ${baseJoin} ${sortBy(sorteredColumn)} ${paginationQuery}`;
  return autoclosedQuery(conn, sql);
};


module.exports.getFiltered = (conn, filter, sorteredColumn) => {
  const sql = `${baseQuery} ${baseJoin} ${filterBy(filter)} ${sortBy(sorteredColumn)}`;
  return autoclosedQuery(conn, sql, [`%${filter}%`, `%${filter}%`]);
};

module.exports.getByCategory = (conn, category, sorteredColumn) => {

  const sql = `${baseQuery} ${baseJoin} ${categorizedBy(category)} ${sortBy(sorteredColumn)}`;
  return autoclosedQuery(conn, sql, [category]);
};



module.exports.getFilteredPaginated = (conn, filter, limit, offset, sorteredColumn) => {
  const paginationQuery = getPaginationQuery(limit, offset);
  const sql = `${baseQuery} ${baseJoin} ${filterBy(filter)} ${sortBy(sorteredColumn)} ${paginationQuery}`;
  return autoclosedQuery(conn, sql, [`%${filter}%`, `%${filter}%`]);
};


module.exports.getByCategoryFiltered = (conn, category, filter, sorteredColumn) => {
  const sql = `${baseQuery} ${baseJoin}  ${categorizedBy(category, filterBy(filter))} ${sortBy(sorteredColumn)}`;
  return autoclosedQuery(conn, sql, [`%${filter}%`, `%${filter}%`, category]);
};