// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'softghost',
  password: 'Password1',
  port: 5432,
});

module.exports = pool;