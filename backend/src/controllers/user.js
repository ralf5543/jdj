/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-var-requires */

// le package bcrypt hash les mots de passe
const bcrypt = require('bcrypt');

// jsonwebtoken crée et vérifie les tokens d'identificationn
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signup = (req, res) => {
  // bcrypt est asynchrone
  bcrypt
    // hash le body de la requete, et "10", c'est le nombre de fois qu'il l'applique
    // 10 est un bon compromis entre sécurité et rapidité
    .hash(req.body.password, 10)
    .then((hash) => {
      // Crée une copie du modèle User, en remplaçant le mdp par le hash
      const user = new User({
        email: req.body.email,
        password: hash,
        nickname: req.body.nickname,
      });
      user
        // sauvegarde le nouveau user dans la BDD
        .save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      // vérifie qu'un email correspondant existe bien dans la BDD
      if (!user) {
        return (
          res
            // sinon, envoie un message vlontairement trouble, pour la sécurité
            .status(401)
            .json({
              message:
                'Paire login/mot de passe incorrecte (en vrai cest lemail qui foire)',
            })
        );
      }
      // compare le mdp crypté avec celui de la BDD
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          // si ça ne correspond pas, message d'erreur flou :)
          if (!valid) {
            return res.status(401).json({
              message:
                'Paire login/mot de passe incorrecte (en vrai cest le MDP qui foire)',
            });
          }
          // si c'est ok, renvoie l'id avec un token
          res.status(200).json({
            userId: user._id,
            nickname: user.nickname,
            // création et encrytage du token
            token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
              expiresIn: '24h',
            }),
          });
        })
        // erreur serveur
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllUsers = (req, res) => {
  // la méthode find() renvvoit le tableau de toutes nos instances User de la BDD
  /* La base de données MongoDB est fractionnée en collections : le nom de la collection est 
    défini par défaut sur le pluriel du nom du modèle. Ici, ce sera Users . */
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(400).json({ error }));
};
