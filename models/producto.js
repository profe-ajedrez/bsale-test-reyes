/**
 * models/productos.js
 */
'use strict';

const config = require('../config/config');
const {query, autoclosedQuery} = require('./db');

const baseQuery = 'SELECT p.id,p.`name`,p.url_image,p.price,p.discount,p.category as category_id, c.name AS category FROM product p';
const countQuery = 'SELECT COUNT(p.id) as `count` FROM product p';
const baseJoin = 'LEFT JOIN category c ON p.category=c.id'
const defaultSort = 'category';
const defaultOrder = 'ORDER BY %DEFAULT_SORT%, p.id ASC';


/**
 * getPaginationQuery
 * 
 * Regresa la porción de una query encargada de definir el limit y el offset
 * Si limit esta indefinido, devuelve un espacio vacio
 * 
 * @param {int} limit 
 * @param {int} offset 
 * @return {String}
 */
const getPaginationQuery = (limit, offset) => {
  let sql = '';

  if (!!limit) {
    sql = `LIMIT ${limit}`;
    sql += offset === null ? '' : ` OFFSET ${offset}`;
  }
  return sql;
};

/**
 * sortBy
 * 
 * Devuelve un string con la parte ORDER BY de una query
 * 
 * @param {String} sorteredColumn 
 * @return {String}
 */
const sortBy = (sorteredColumn) => {
  sorteredColumn = sorteredColumn || defaultSort;
  return defaultOrder.replace('%DEFAULT_SORT%', sorteredColumn);
};


/**
 * filterBy
 * 
 * Devuelve un string con la parte WHERE de una consulta SQL
 * 
 * @param {String} toFilter 
 * @return {String}
 */
const filterBy = (toFilter) => {
  if (!toFilter) {
    return '';
  }

  return 'WHERE (LOWER(p.`name`) LIKE ? OR LOWER(c.name) LIKE ?)'
};


/**
 * categorizedBy
 * 
 * Devuelve el filtro de categoria como string
 *
 * @param {int} category
 * @param {String} prevCondition
 * @return {*} 
 */
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

module.exports.countCategoryFiltered = (conn, category, filter, sorteredColumn) => {
  let params = [];
  const sql = `${countQuery} ${baseJoin} ${categorizedBy(category, filterBy(filter))} ${sortBy(sorteredColumn)}`;
  if (!!filter) {
    params.push(`%${filter}%`);
    params.push(`%${filter}%`);
  }
  if (!!category) {
    params.push(category);
  }
  return query(conn, sql, params);
};

module.exports.getByCategoryFilteredPaginated = (conn, category, filter, limit, offset, sorteredColumn) => {
  const paginationQuery = getPaginationQuery(limit, offset);
  const sql = `${baseQuery} ${baseJoin}  ${categorizedBy(category, filterBy(filter))} ${sortBy(sorteredColumn)} ${paginationQuery}`;
  return autoclosedQuery(conn, sql, [`%${filter}%`, `%${filter}%`, category]);
};