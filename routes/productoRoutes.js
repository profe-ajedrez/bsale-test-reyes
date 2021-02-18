/**
 * routes/productoRoutes.js
 */
'use strict';

const express = require('express');
const productoController = require(`../controllers/productoController`);
const router = express.Router();



router.route('/')
.get(productoController.getAllProducts);


router.route('/limit/:limit/offset/:offset')
.get(productoController.getPaginatedProducts);

router.route('/filter/:filter')
.get(productoController.getFilteredProducts)

router.route('/limit/:limit/offset/:offset/filter/:filter')
.get(productoController.getFilteredProductsPaginated);

module.exports = router;