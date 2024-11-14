require('dotenv').config();
const sql = require('mssql');

// Configuración de la base de datos utilizando variables de entorno
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT), // Convertimos el puerto a número
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Requerido por Azure
    trustServerCertificate: false,
  },
};

const connectDB = async () => {
  try {
    await sql.connect(dbConfig);
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('Error en la conexión a la base de datos:', error);
  }
};

module.exports = { sql, connectDB };
