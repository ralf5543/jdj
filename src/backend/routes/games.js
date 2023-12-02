/* eslint-disable @typescript-eslint/no-var-requires */

// import du package express
const express = require('express');

// protecion à l'accès de chacune des routes avec l'authentification par token
const auth = require('../middleware/auth');

const routeur = express.Router();

const gameController = require('../controllers/games');

routeur.post('/', auth, gameController.createGame);

// Le dernier middleware d'une chaîne doit renvoyer la réponse au client pour empêcher la requête d'expirer.

// deux-points en face du segment dynamique de la route pour la rendre accessible en tant que paramètre ;
// "auth" est appelé avant les autres paramètres, pour proteger l'accès
routeur.get('/:id', auth, gameController.getOneGame);

routeur.put('/:id', auth, gameController.modifyGame);

routeur.delete('/:id', auth, gameController.deleteGame);

routeur.get('/', auth, gameController.getAllGames);

module.exports = routeur;
