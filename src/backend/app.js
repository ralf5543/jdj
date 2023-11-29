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

// On importe notre modèle
const Game = require('./models/game');

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
app.use(cors());

app.post('/api/games', (req, res, next) => {
  // supprime l'id existant par défaut dans le body (puisque mongoose va en ajouté un)
  // eslint-disable-next-line no-underscore-dangle
  delete req.body._id;

  // crée une instance du modèle Thing en lui passant tous les éléments de body, via un spread operator
  const game = new Game({
    ...req.body,
  });

  // La méthode save() renvoie une Promise
  game
    .save()
    // 201 est une création de ressource
    // il faut envoyer qquechose dans le then, sinon la requete est abandonnée
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch((error) => res.status(400).json({ error }));
});

// Le dernier middleware d'une chaîne doit renvoyer la réponse au client pour empêcher la requête d'expirer.

/* app.get('/api/stuff', (req, res, next) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://picsum.photos/300/300',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://picsum.photos/300/300',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    // on lui passe le contenu de la const, sous forme de json, avec un code 200 si réussi
    res.status(200).json(stuff);
  }); */

// deux-points en face du segment dynamique de la route pour la rendre accessible en tant que paramètre ;
app.get('/api/games/:id', (req, res) => {
  // findOne() trouve le Thing unique ayant le même _id que le paramètre de la requête
  Game.findOne({ _id: req.params.id })
    .then((game) => res.status(200).json(game))
    .catch((error) => res.status(404).json({ error }));
});

app.put('/api/games/:id', (req, res) => {
  //  updateOne modifie le corps de l'objet avec l'id précisé
  // on ne veut pas créer un nouvel id, donc on précise que son "nouvel" id correspond à l'ancien (celui de la requete)
  Game.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch((error) => res.status(400).json({ error }));
});

app.delete('/api/games/:id', (req, res) => {
  // deleteOne() supprime l'instance avec l'id correspondant
  Game.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch((error) => res.status(400).json({ error }));
});

// api/games est ici un raccourci pour http://localhost:3000/api/games
app.get('/api/games', (req, res) => {
  // la méthode find() renvvoit le tableau de toutes nos instances Thing de la BDD
  /* La base de données MongoDB est fractionnée en collections : le nom de la collection est 
    défini par défaut sur le pluriel du nom du modèle. Ici, ce sera Things . */
  Game.find()
    .then((games) => res.status(200).json(games))
    .catch((error) => res.status(400).json({ error }));
});

// Exporte la const pour pouvvoir y appliquer partout (notamment dans le fichier server.js)
module.exports = app;
