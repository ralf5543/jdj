// import de mongoose, pour créer le schéma
const mongoose = require('mongoose');

// l'id de chaque objet sera généré autimatiquement par Mongoose
const gameSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
});

// transforme ce schéma en modèle utilisable
module.exports = mongoose.model('Game', gameSchema);
