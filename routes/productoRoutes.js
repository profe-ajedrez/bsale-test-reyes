/**
 * routes/productoRoutes.js
 * 
 * Contiene las definiciones de las rutas del recurso producto
 */
'use strict';

const express = require('express');
const productoController = require(`../controllers/productoController`);
const router = express.Router();


/**
 * Ruta invocada para traer todos los productos
 */
router.route('/')
.get(productoController.getAllProducts);

/**
 * Ruta para petición de productos, con un limite y un offset
 */
router.route('/limit/:limit/offset/:offset')
.get(productoController.getPaginatedProducts);

/**
 * Ruta para petición de productos por categoría
 */
router.route('/category/:category')
.get(productoController.getCategorizedProducts);

/**
 * Ruta para petición de productos aplicando filtro
 */
router.route('/filter/:filter')
.get(productoController.getFilteredProducts)

router.route('/category/:category/filter/:filter')
.get(productoController.getCategorizedFilteredProducts);


router.route('/limit/:limit/offset/:offset/filter/:filter')
.get(productoController.getFilteredProductsPaginated);


router.route('/category/:category/filter/:filter/limit/:limit/offset/:offset')
.get(productoController.getCategorizedFilteredPaginatedProducts);

module.exports = router;
