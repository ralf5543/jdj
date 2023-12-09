/* eslint-disable @typescript-eslint/no-var-requires */

// import de mongoose, pour gérer les BDD du backend avec MongoDB
const mongoose = require('mongoose');

// import du package express
const express = require('express');

// app est notre application; elle devient une application express
const app = express();

// Gère tout ce qui est problèmes de CORS (Cross origin bla bla)
const cors = require('cors');

app.use(cors());

const dotenv = require('dotenv');

dotenv.config();

// Accède au path du serveur
const path = require('path');

// Importation des routes
const gamesRoutes = require('./routes/games');
const userRoutes = require('./routes/user');
const imagesRoutes = require('./routes/images');

const uri = process.env.STRING_URI;

// connexion à un user (via une uri pour proteger les infos, dans le fichier .env)
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
mongoose.connect(uri, { useNewUrlParser: true });

// intercepte toutes les requetes avec un content-type de type json et le met à disposition de req.body
app.use(express.json());

// Remplace la racine de tous les paths du fichier routeur par "/api/games"
app.use('/api/games', gamesRoutes);
app.use('/api/auth', userRoutes);

// Express gère le dossier "images" de manière statique à chaque requete vers la route /images
app.use(
  '/images',
  express.static(path.join(__dirname, '../images')),
  imagesRoutes
);

// Exporte la const pour pouvvoir y appliquer partout (notamment dans le fichier server.js)
module.exports = app;
