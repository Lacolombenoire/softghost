// Backend/db.js
import pg from 'pg';
const { Pool } = pg;
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'votre_base',
  password: process.env.DB_PASSWORD || 'votre_mot_de_passe',
  port: process.env.DB_PORT || 5431, // ✅ FORCER le port 5431
  // Ajouter cette option pour forcer le schéma
  schema: 'public',
});


// Test de connexion
pool.on('connect', (client) => {
  client.query('SET search_path TO public');
});

export default pool;