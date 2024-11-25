import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectDB from './config/configdb.js'; // Ajoute ".js" à la fin des importations en ESM
import authRouter from './routes/auth.js';
import cvRouter from './routes/cv.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Connexion à MongoDB
connectDB();

// Middlewares globaux
app.use(cors({ origin: 'http://localhost:5173' })); // Autorise les requêtes du frontend
app.use(bodyParser.json()); // Parse les requêtes JSON

// Routes principales
app.use('/auth', authRouter); // Routes d'authentification
app.use('/api/cv', cvRouter); // Routes pour les CV

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
