/* eslint-disable @typescript-eslint/no-var-requires */
// import de mongoose, pour créer le schéma
const mongoose = require('mongoose');

// l'id de chaque objet sera généré autimatiquement par Mongoose
const gameSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  minplayers: { type: String, required: true },
  maxplayers: { type: String, required: true },
  idealplayers: { type: String, required: true },
  duration: { type: String, required: true },
  visual: { type: String, required: true },
  confrontation: { type: String, required: true },
  owners: { type: Array, required: false },

  // given by the user who created the article, so only him can modify it
  userId: { type: String, required: false },
  userNickname: { type: String, required: false },
});

// transforme ce schéma en modèle utilisable
module.exports = mongoose.model('Game', gameSchema);
