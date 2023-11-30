/* eslint-disable @typescript-eslint/no-var-requires */

// import du package express
const express = require('express');

const routeur = express.Router();

const gameController = require('../controllers/games');

routeur.post('/', gameController.createGame);

// Le dernier middleware d'une chaîne doit renvoyer la réponse au client pour empêcher la requête d'expirer.

// deux-points en face du segment dynamique de la route pour la rendre accessible en tant que paramètre ;
routeur.get('/:id', gameController.getOneGame);

routeur.put('/:id', gameController.modifyGame);

routeur.delete('/:id', gameController.deleteGame);

routeur.get('/', gameController.getAllGames);

module.exports = routeur;
