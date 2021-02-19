/**
 * controllers/productController.js
 */
'use strict';

const config = require('../config/config');
const producto = require('../models/producto');
const { getConnection } = require('../models/db');

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



/**
 * checkCategory
 *
 * Si category no es numerico, envia respuesta con status 400
 * 
 * @param {*} category
 * @param {*} req
 * @param {*} res
 * @return {*} 
 */
const checkCategory = (category, req, res) => {
  /* Solo aceptamos categorías numericas, en caso contrario respondemos con 
     status código 400, mal request, porque preferimos asumir una intervención del request, por seguridad
  */
  if (isNaN(category)) {

    return res.status(400).json({
      status: 'failed',
      code: 400,
      data: {
        productos: [],
        category: req.params.category,
      }
    });
  }
};


/**
 * getAllProducts
 * 
 * Maneja la petición de todos los productos
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getAllProducts = async (req, res) => {
  const conn = await getConnection(config);
    
  producto.getAll(conn)
  .then((productos) => {
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



/**
 * getPaginatedProducts
 * 
 * Maneja la petición paginada de los productos
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getPaginatedProducts = async (req, res) => {
  const conn = await getConnection(config);
  const { limit, offset } = getLimitOffset(req);  

  producto.getPaginated(conn, limit, offset)
  .then((productos) => {
    
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



/**
 * getFilteredProducts
 * 
 * Maneja la petición filtrada de los productos
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getFilteredProducts = async (req, res) => {
  const conn = await getConnection(config);
  const filter = req.params.filter.toLowerCase();

  producto.getFiltered(conn, filter)
  .then((productos) => {
        
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



/**
 * getFilteredProductsPaginated
 * 
 * Maneja la petición filtrada y paginada de los productos
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getFilteredProductsPaginated = async (req, res) => {
  const conn = await getConnection(config);
  const filter = req.params.filter.toLowerCase();
  const { limit, offset } = getLimitOffset(req);


  producto.getFilteredPaginated(conn, filter, limit, offset)
  .then((productos) => {
        
    res.status(200).json({
      status: 'success',
      data: {
        productos: productos,
        filter: filter,
        limit: limit,
        offset: offset,
      }
    });
  }).catch((err) => {
       
    res.status(500).json({
      status: 'failed',
      message: err
    });
  });
   
};



/**
 * getCategorizedProducts
 * 
 * Maneja la petición filtrada por categoría de los productos
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getCategorizedProducts = async (req, res) => {
  const category = parseInt(req.params.category);

  checkCategory(category, req, res);

  const conn = await getConnection(config);
  const queryCount = await producto.countCategoryFiltered(conn, category);

  producto.getByCategory(conn, category)
  .then((productos) => {
    
    if (productos.length === 0) {
      return res.status(404).json({
        status: 'failed',
        code: 404,
        data: {
          productos: [],
          category: req.params.category,
          count: 0,
        }
      });
    }


    return res.status(200).json({
      status: 'success',
      data: {
        productos: productos,
        category: req.params.category,
        count: queryCount[0].count
      }
    });
  }).catch((err) => {
    
    return res.status(500).json({
      status: 'failed',
      message: err,
      data: {
        productos: [],
        count: 0,
      }
    });
  });
    
};



/**
 * getCategorizedFilteredProducts
 * 
 * Maneja la petición filtrada por categoría y por filtro personalizado de los productos
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getCategorizedFilteredProducts = async (req, res) => {
  const category = parseInt(req.params.category);
  const filterBy = req.params.filter;

  checkCategory(category, req, res);

  const conn = await getConnection(config);
  const queryCount = await producto.countCategoryFiltered(conn, category, filterBy);
  producto.getByCategoryFiltered(conn, category, filterBy)
  .then((productos) => {
    
    if (productos.length === 0) {
      return res.status(404).json({
        status: 'failed',
        code: 404,
        data: {
          productos: [],
          category: req.params.category,
          count: queryCount[0].count
        }
      });
    }


    return res.status(200).json({
      status: 'success',
      data: {
        productos: productos,
        category: req.params.category,
        filter: filterBy
      }
    });
  }).catch((err) => {
    
    return res.status(500).json({
      status: 'failed',
      message: err,
      data: {
        productos: []
      }
    });
  });

};


/**
 * getCategorizedFilteredPaginatedProducts
 * 
 * Maneja la petición paginada y filtrada por categoría y por filtro personalizado de los productos
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
exports.getCategorizedFilteredPaginatedProducts = async (req, res) => {
  const category = parseInt(req.params.category);
  const filterBy = req.params.filter;
  const { limit, offset } = getLimitOffset(req);

  checkCategory(category, req, res);

  const conn = await getConnection(config);
  const queryCount = await producto.countCategoryFiltered(conn, category, filterBy);
  
  producto.getByCategoryFilteredPaginated(conn, category, filterBy, limit, offset)
  .then((productos) => {
    
    if (productos.length === 0) {
      return res.status(404).json({
        status: 'failed',
        code: 404,
        data: {
          productos: [],
          category: req.params.category,
          filter: filterBy,
          limit: limit,
          offset: offset,
          count: 0
        }
      });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        productos: productos,
        category: req.params.category,
        filter: filterBy,
        limit: limit,
        offset: offset,
        count: queryCount[0].count
      }
    });
  }).catch((err) => {
    
    return res.status(500).json({
      status: 'failed',
      message: err,
      data: {
        productos: [],
        filter: filterBy,
        limit: limit,
        offset: offset,
        count: 0
      }
    });
  });

};

