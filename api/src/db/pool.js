import mysql from 'mysql2/promise';

let pool;
try {
  pool = mysql.createPool({
    host: 'localhost',
    user: process.env.DB_USER,
    database: 'sports_community',
    port: process.env.DB_PORT || 3306,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  });
} catch (err) {
  console.log(err);
  throw err;
}

export default pool;
