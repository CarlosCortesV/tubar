const sql = require('mssql');

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

async function connectToDatabase() {
  try {
    await sql.connect(dbConfig);
    console.log('Connected to SQL Server');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

module.exports = { connectToDatabase, sql };
