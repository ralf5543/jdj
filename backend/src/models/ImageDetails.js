/* eslint-disable @typescript-eslint/no-var-requires */
// import de mongoose, pour créer le schéma
const mongoose = require('mongoose');

const ImageDetailsScehma = new mongoose.Schema(
  { image: String },
  { collection: 'ImageDetails' }
);

module.exports = mongoose.model('ImageDetails', ImageDetailsScehma);
