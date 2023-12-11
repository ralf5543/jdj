/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-var-requires */

// On importe notre modèle
const Game = require('../models/Game');

exports.createGame = (req, res) => {
  const gameObject = req.body;
  // supprime l'id existant par défaut dans le body (puisque mongoose va en ajouté un)
  delete gameObject._id;
  delete gameObject._userId;

  // crée une instance du modèle Game en lui passant tous les éléments de body, via un spread operator
  const game = new Game({
    ...req.body,
    // gives the user id to the article so only it's owner can delete / modify it
    userId: req.auth.userId,
  });
  game
    // La méthode save() renvoie une Promise
    .save()
    // 201 est une création de ressource
    // il faut envoyer qquechose dans le then, sinon la requete est abandonnée
    .then(() => {
      res.status(201).json({ message: 'Objet enregistré !' });
      console.log('req.auth.userId : ', req.auth.userId);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.getOneGame = (req, res) => {
  // findOne() trouve le modèle Game unique ayant le même _id que le paramètre de la requête
  Game.findOne({ _id: req.params.id })
    .then((game) => res.status(200).json(game))
    .catch((error) => res.status(404).json({ error }));
};

exports.modifyGame = (req, res) => {
  const gameObject = req.body;
  delete gameObject._userId;

  Game.findOne({ _id: req.params.id })
    .then((thing) => {
      if (thing.userId !== req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        Game.updateOne(
          { _id: req.params.id },
          { ...gameObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: 'Objet modifié!' }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

/* exports.modifyGame = (req, res) => {
  //  updateOne modifie le corps de l'objet avec l'id précisé
  // on ne veut pas créer un nouvel id, donc on précise que son "nouvel" id correspond à l'ancien (celui de la requete)
  Game.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch((error) => res.status(400).json({ error }));
}; */

exports.deleteGame = (req, res) => {
  Game.findOne({ _id: req.params.id })
    .then((game) => {
      // check if user id given to the article is the same as the current user id
      if (game.userId !== req.auth.userId) {
        res.status(401).json({ message: 'Not authorized' });
      } else {
        Game.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(200).json({ message: 'Objet supprimé !' });
          })
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getAllGames = (req, res) => {
  // la méthode find() renvvoit le tableau de toutes nos instances Game de la BDD
  /* La base de données MongoDB est fractionnée en collections : le nom de la collection est 
    défini par défaut sur le pluriel du nom du modèle. Ici, ce sera Games . */
  Game.find()
    .then((games) => res.status(200).json(games))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllImages = (req, res) => {
  // la méthode find() renvvoit le tableau de toutes nos instances Game de la BDD
  /* La base de données MongoDB est fractionnée en collections : le nom de la collection est 
    défini par défaut sur le pluriel du nom du modèle. Ici, ce sera Games . */
  Game.find()
    .then((games) => res.status(200).json(games))
    .catch((error) => res.status(400).json({ error }));
};
