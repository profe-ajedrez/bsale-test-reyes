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

router.route('/category/:category')
.get(productoController.getCategorizedProducts);


router.route('/filter/:filter')
.get(productoController.getFilteredProducts)

router.route('/category/:category/filter/:filter')
.get(productoController.getCategorizedFilteredProducts);


router.route('/limit/:limit/offset/:offset/filter/:filter')
.get(productoController.getFilteredProductsPaginated);




router.route('/category/:category/filter/:filter/limit/:limit/offset/:offset')
.get(productoController.getCategorizedFilteredPaginatedProducts);

module.exports = router;
