import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "BioNaturaDB",
  connectTimeout: 20000
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado a MySQL');
});

export default db;