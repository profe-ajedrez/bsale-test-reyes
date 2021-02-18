/**
 * controllers/productController.js
 */
'use strict';

const producto = require('../models/producto');


/**
 * getLimitOffset
 * 
 * Retorna un objeto con el valor de limite y offset incluido en el body de la petición, si es que hubieran.
 */
const getLimitOffset = (req) => {
  let limit = 10, offset = 0;
  if (!!req.params) {
    if (req.params.hasOwnProperty('limit')) {
      limit = parseInt(req.params.limit);
    }

    if (req.params.hasOwnProperty('offset')) {
      offset = parseInt(req.params.offset);
    }
  }
  return { limit: limit, offset: offset };
};



exports.getAllProducts = (req, res) => {
    
  producto.getAll(req.conn)
  .then((productos) => {
    req.conn.end();
    res.status(200).json({
      status: 'success',
      data: {
        productos: productos
      }
    });
  }).catch((err) => {
    res.status(500).json({
      status: 'failed',
      message: err
    });
  });
};


exports.getPaginatedProducts = (req, res) => {
  const { limit, offset } = getLimitOffset(req);  

  producto.getPaginated(req.conn, limit, offset)
  .then((productos) => {
    req.conn.end();
    res.status(200).json({
      status: 'success',
      data: {
        productos: productos,
        limit: limit,
        offset: offset
      }
    });
  }).catch((err) => {
    res.status(500).json({
      status: 'failed',
      message: err
    });
  });
};


exports.getFilteredProducts = (req, res) => {
  const filter = req.params.filter.toLowerCase();

  producto.getFiltered(req.conn, filter)
  .then((productos) => {
    req.conn.end();    
    res.status(200).json({
      status: 'success',
      data: {
        productos: productos,
        filter: filter
      }
    });
  }).catch((err) => {
    res.status(500).json({
      status: 'failed',
      message: err
    });
  });
};


exports.getFilteredProductsPaginated = (req, res) => {
  const filter = req.params.filter.toLowerCase();
  const { limit, offset } = getLimitOffset(req);

  producto.getFilteredPaginated(req.conn, filter, limit, offset)
  .then((productos) => {
    req.conn.end();    
    res.status(200).json({
      status: 'success',
      data: {
        productos: productos,
        filter: filter,
        limit: limit,
        offset: offset
      }
    });
  }).catch((err) => {
    res.status(500).json({
      status: 'failed',
      message: err
    });
  });
};
