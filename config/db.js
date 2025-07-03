const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'actividad12',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Probar la conexión
const testConnection = async () => {
  try {
    const [result] = await pool.query('SELECT 1 + 1 AS result');
    console.log('Conexión a MySQL exitosa:', result[0]);
  } catch (error) {
    console.error('Error conectando a MySQL:', error);
  }
};

testConnection();

module.exports = pool; 