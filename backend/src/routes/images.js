/* eslint-disable @typescript-eslint/no-var-requires */
// /////////////// UPLOAD DE MEEEEEEEEEEERDE

const express = require('express');

const routeur = express.Router();
const multer = require('multer');

const Images = require('../models/ImageDetails');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

const storage = multer.diskStorage({
  // destination : dossier "images"
  destination: (req, file, callback) => {
    // null, pour dire qu'il n'y a pas d'erreur
    callback(null, 'images');
  },
  // quel nom de fichier utiliser
  filename: (req, file, callback) => {
    // utilise le fichier d'origine, en remplaçant les espaces par des "_"
    const name = file.originalname.split(' ').join('_');
    // ajoute la bonne extension en fonction de son MIME_TYPES
    const extension = MIME_TYPES[file.mimetype];
    // ajoute un timestamp au nom du fichier (pour le rendre unique)
    callback(null, `${name + Date.now()}.${extension}`);
  },
});

const upload = multer({ storage });

routeur.post('/', upload.single('file'), async (req, res) => {
  const imageName = req.file.filename;
  console.log('imageName', imageName);

  try {
    await Images.create({ image: imageName });
    res.json({ status: `${imageName}` });
  } catch (error) {
    res.json({ status: error });
  } finally {
    console.log('req.file.path : ', req.file.path);
  }
});

// routeur.get('/get-image', imageController.getAllImages);

/* routeur.get('/get-image', async (req, res) => {
  try {
    Images.find({}).then((data) => {
      res.send({ status: 'ok', data });
    });
  } catch (error) {
    res.json({ status: error });
  }
}); */

module.exports = routeur;
