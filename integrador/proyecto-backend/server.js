const express = require('express');
const mongoose = require('mongoose');
const serverConfig = require('./config/server-config');
const productosRoutes = require('./routes/productosRoutes');
const loadEnvVariables = require('./utils/dotenv');

// Cargar las variables de entorno al inicio de la aplicación
loadEnvVariables();

const app = express();

// Conectar a MongoDB
mongoose.connect(serverConfig.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((error) => {
    console.error('Error de conexión a MongoDB:', error.message);
    process.exit(1); // Salir del proceso si hay un error en la conexión a la base de datos
  });

// Configuración de la conexión a MongoDB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));

// Middleware para manejar JSON en las solicitudes
app.use(express.json());

// Rutas de productos
app.use('/api', productosRoutes);

// Iniciar el servidor
const PORT = serverConfig.PORT;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});