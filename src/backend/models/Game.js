/* eslint-disable @typescript-eslint/no-var-requires */
// import de mongoose, pour créer le schéma
const mongoose = require('mongoose');

// l'id de chaque objet sera généré autimatiquement par Mongoose
const gameSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  maxplayers: { type: Number, required: true },
  idealplayers: { type: Number, required: true },
  duration: { type: Number, required: true },
  visual: { type: String, required: false },
});

// transforme ce schéma en modèle utilisable
module.exports = mongoose.model('Game', gameSchema);
