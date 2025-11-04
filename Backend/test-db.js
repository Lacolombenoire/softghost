// Backend/test-db.js
import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5431,
});

async function testConnection() {
  try {
    console.log('🔌 Test de connexion à PostgreSQL...');
    console.log('Paramètres:', {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user: process.env.DB_USER
    });
    
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Connexion BD réussie:', result.rows[0]);
    
    const formations = await pool.query('SELECT COUNT(*) FROM formation');
    console.log('✅ Nombre de formations:', formations.rows[0].count);
    
    await pool.end();
  } catch (error) {
    console.error('❌ Erreur connexion BD:', error.message);
  }
}

testConnection();