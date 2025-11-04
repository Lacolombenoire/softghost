// Backend/server.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import formationRoutes from './routes/formations.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.join(__dirname, '../src/assets/images')));

// Routes
app.use('/api', formationRoutes);

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});