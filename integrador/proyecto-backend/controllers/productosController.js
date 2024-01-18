// controllers/productosController.js
const Producto = require('../models/productoModel');

const productosController = {
  getAllProductos: async (req, res) => {
    try {
      const productos = await Producto.find();
      res.status(200).json(productos);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener los productos' });
    }
  },

  createProducto: async (req, res) => {
    const { nombre, precio } = req.body;
    try {
      const nuevoProducto = new Producto({ nombre, precio });
      await nuevoProducto.save();
      res.status(201).json({ message: 'Producto creado con éxito' });
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el producto' });
    }
  },

  updateProducto: async (req, res) => {
    const { id } = req.params;
    const { nombre, precio } = req.body;
    try {
      await Producto.findByIdAndUpdate(id, { nombre, precio });
      res.status(200).json({ message: 'Producto actualizado con éxito' });
    } catch (error) {
      res.status(500).json({ error: 'Error al actualizar el producto' });
    }
  },

  deleteProducto: async (req, res) => {
    const { id } = req.params;
    try {
      await Producto.findByIdAndDelete(id);
      res.status(200).json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
      res.status(500).json({ error: 'Error al eliminar el producto' });
    }
  },

  subirCarrito: async (req, res) => {
    const carritoData = req.body;
    console.log('Carrito recibido:', carritoData);
    // Implementa lógica para mostrar o almacenar el carrito
    res.status(200).json({ message: 'Carrito recibido con éxito' });
  },
};

module.exports = productosController;