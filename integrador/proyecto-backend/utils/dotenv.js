const dotenv = require('dotenv');

const loadEnvVariables = () => {
  const result = dotenv.config();

  if (result.error) {
    console.error('Error al cargar variables de entorno:', result.error.message);
    process.exit(1); // Salir del proceso si hay un error en la carga
  }

  console.log('Variables de entorno cargadas correctamente.');
};

module.exports = loadEnvVariables;