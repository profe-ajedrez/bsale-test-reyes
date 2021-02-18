/**
 * controllers/categoryController.js
 */
'use strict';

const category = require('../models/categoria');

exports.getAllCategories = (req, res) => {
    
  category.getAll(req.conn)
  .then((categories) => {
    req.conn.end();
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
