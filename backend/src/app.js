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

const uri = process.env.STRING_URI;

// connexion à un user (ralf5543, le mdp est juste après les deux points)
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
mongoose.connect(uri, { useNewUrlParser: true });

// Ceci est un middleware, une fonction qui traite les requetes et les réponses
// "use" si on veut intercepter toutes les requetes, sinon on précise (get, post...)
/* app.use((request, response, next) => {
    console.log('requete reçue');
    // next permet d'enchainer avec le prochain middleware
    next();
});

app.use((req, res, next) => {
    // ajoute un code d'état 201 à la réponse
    res.status(201);
    next();
  });

app.use((request, response) => {
    // Gere les requetes en renvoyant un objet json
    response.json({ message: 'Votre requête a bien été reçue !' });
}); */

// intercepte toutes les requetes avec un content-type de type json et le met à disposition de req.body
app.use(express.json());

// Ici on donne l'autorisation à l'app de recevoir les requetes et réponses (mais s'applique sur la réponse) d'autres serveurs, en passant des "headers".
// Si on ne fait pas ça, le CORS protège les échanges entre deux serveurs
// pas de route spécifique, on veut que ça s'applique à toutes les routes
/* app.use(cors) => {
  // * : tout le monde à accès à l'origine (notre api)
  res.setHeader('Access-Control-Allow-Origin', '*');
  // ajoute les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  // on autorise les Get, les Post...
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
}); */

// Remplace la racine de tous les paths du fichier routeur par "/api/games"
app.use('/api/games', gamesRoutes);
app.use('/api/auth', userRoutes);
// Express gère le dossier "images" de manière statique à chaque requete vers la route /images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Exporte la const pour pouvvoir y appliquer partout (notamment dans le fichier server.js)
module.exports = app;
