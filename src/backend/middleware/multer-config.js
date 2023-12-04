/* eslint-disable @typescript-eslint/no-var-requires */
const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

// indique à multer où stocker els fichiers entrants
const storage = multer.diskStorage({
  // destination : dossier "images"
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    // utilise le fichier d'origine, en remplaçant les espaces par des "_"
    const name = file.originalname.split(' ').join('_');
    // ajoute l'extension choisie dans le "dictionnaire" MIME_TYPES
    const extension = MIME_TYPES[file.mimetype];
    // ajoute un timestamp au nom du fichier (pour le rendre unique)
    callback(null, `${name + Date.now()}.${extension}`);
  },
});

// horthannd property, means storage: storage
module.exports = multer({ storage }).single('image');
