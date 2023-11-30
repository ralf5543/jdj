/* eslint-disable @typescript-eslint/no-var-requires */
// import de mongoose, pour créer le schéma
const mongoose = require('mongoose');

// ce plugin mongoose aide à avoir une clé unique, ici l'email, dans notre objet
const uniqueValidator = require('mongoose-unique-validator');

// l'id de chaque objet sera généré autimatiquement par Mongoose
const userSchema = mongoose.Schema({
  // le unique true empeche plusieurs clés identiques
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

// transforme ce schéma en modèle utilisable
module.exports = mongoose.model('User', userSchema);
