/* eslint-disable @typescript-eslint/no-var-requires */
const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

// indique à multer où stocker les fichiers entrants
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

// single => fichier unique; 'image', fichier de type image
// horthannd property, means storage: storage
module.exports = multer({ storage }).single('image');
