const mongoose = require('mongoose');

// Define el esquema del producto
const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  // Puedes agregar otros campos según tus necesidades
});

// Crea el modelo a partir del esquema
const Producto = mongoose.model('Producto', productoSchema);

// Exporta el modelo para su uso en otros archivos
module.exports = Producto;