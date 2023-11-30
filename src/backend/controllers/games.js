/* eslint-disable @typescript-eslint/no-var-requires */

// On importe notre modèle
const Game = require('../models/game');

exports.createGame = (req, res) => {
  // supprime l'id existant par défaut dans le body (puisque mongoose va en ajouté un)
  // eslint-disable-next-line no-underscore-dangle
  delete req.body._id;

  // crée une instance du modèle Game en lui passant tous les éléments de body, via un spread operator
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
};

exports.getOneGame = (req, res) => {
  // findOne() trouve le Thing unique ayant le même _id que le paramètre de la requête
  Game.findOne({ _id: req.params.id })
    .then((game) => res.status(200).json(game))
    .catch((error) => res.status(404).json({ error }));
};

exports.modifyGame = (req, res) => {
  //  updateOne modifie le corps de l'objet avec l'id précisé
  // on ne veut pas créer un nouvel id, donc on précise que son "nouvel" id correspond à l'ancien (celui de la requete)
  Game.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteGame = (req, res) => {
  // deleteOne() supprime l'instance avec l'id correspondant
  Game.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllGames = (req, res) => {
  // la méthode find() renvvoit le tableau de toutes nos instances Game de la BDD
  /* La base de données MongoDB est fractionnée en collections : le nom de la collection est 
    défini par défaut sur le pluriel du nom du modèle. Ici, ce sera Games . */
  Game.find()
    .then((games) => res.status(200).json(games))
    .catch((error) => res.status(400).json({ error }));
};
