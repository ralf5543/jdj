/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-var-requires */

// On importe notre modèle
const Image = require('../models/ImageDetails');

exports.getAllImages = (req, res) => {
  // la méthode find() renvoit le tableau de toutes nos instances Image de la BDD
  /* La base de données MongoDB est fractionnée en collections : le nom de la collection est 
    défini par défaut sur le pluriel du nom du modèle. Ici, ce sera images . */
  Image.find()
    .then((images) => res.status(200).json(images))
    .catch((images) => res.status(400).json({ images }));
};
