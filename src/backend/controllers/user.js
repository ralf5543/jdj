/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-var-requires */

// le package bcrypt hash les mots de passe
const bcrypt = require('bcrypt');
const User = require('../models/user');

exports.signup = (req, res, next) => {
  // bcrypt est asynchrone
  bcrypt
    // hash le body de la requete, et "10", c'est le nombre de fois qu'il l'applique
    // 10 est un bon compromis entre sécurité et rzapidité
    .hash(req.body.password, 10)
    .then((hash) => {
      // Crée une copie du modèle User, en remplaçant le mdp par le hash
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        // sauvegarde le nouveau user dans la BDD
        .save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      // vérifie qu'un email correspondant existe bien dans la BDD
      if (!user) {
        return (
          res
            // sinon, envoie un message vlontairement trouble, pour la sécurité
            .status(401)
            .json({ message: 'Paire login/mot de passe incorrecte' })
        );
      }
      // compare le mdp crypté avec celui de la BDD
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          // si ça ne correspond pas, message d'erreur flou :)
          if (!valid) {
            return res
              .status(401)
              .json({ message: 'Paire login/mot de passe incorrecte' });
          }
          // si c'est ok, renvoie l'id avec un token
          res.status(200).json({
            userId: user._id,
            token: 'TOKEN',
          });
        })
        // erreur serveur
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
