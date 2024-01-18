// config/server-config.js
require('dotenv').config();

// Configuración del servidor
module.exports = {
  // Puerto del servidor, por defecto 3000
  PORT: process.env.PORT || 3000,
  
  // URI de la base de datos MongoDB, por defecto local
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/tiendaVideojuegos',
};