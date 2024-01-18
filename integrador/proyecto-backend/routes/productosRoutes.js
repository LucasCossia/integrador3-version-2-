const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Rutas para productos
router.get('/productos', productosController.getAllProductos);
router.post('/productos', productosController.createProducto);
router.put('/productos/:id', productosController.updateProducto);
router.delete('/productos/:id', productosController.deleteProducto);

// Ruta para subir carrito
router.post('/subir-carrito', productosController.subirCarrito);

module.exports = router;