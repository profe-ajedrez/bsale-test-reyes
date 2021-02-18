/**
 * controllers/categoryController.js
 */
'use strict';

const config = require('../config/config');
const category = require('../models/categoria');
const { getConnection } = require('../models/db');

exports.getAllCategories = async (req, res) => {
    
  const conn = await getConnection(config);

  category.getAll(conn)
  .then((categories) => {
    
    res.status(200).json({
      status: "success",
      data: {
        categories: categories,
      },
    });
  })
  .catch((err) => {
    
    res.status(500).json({
      status: "failed",
      message: err,
    });
  });
};
