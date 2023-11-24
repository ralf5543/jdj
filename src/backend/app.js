// import de mongoose, pour gérer les BDD du backend avec MongoDB
const mongoose = require('mongoose');

const express = require('express');

const app = express();

const Game = require('./models/Game');

mongoose
  .connect(
    // user test sur MongoDB
    'mongodb+srv://jdj-test:3zpw5EIHBVO33PFn@cluster0.uvb0mui.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );

  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.post('/api/stuff', (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  delete req.body._id;

  const game = new Game({
    ...req.body,
  });

  game
    .save()

    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch((error) => res.status(400).json({ error }));
});

app.get('/api/stuff/:id', (req, res) => {
  Game.findOne({ _id: req.params.id })
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
});

app.put('/api/stuff/:id', (req, res) => {
  Game.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !' }))
    .catch((error) => res.status(400).json({ error }));
});

app.delete('/api/stuff/:id', (req, res) => {
  // deleteOne() supprime l'instance avec l'id correspondant
  Game.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
    .catch((error) => res.status(400).json({ error }));
});

app.get('/api/stuff', (req, res) => {
  Game.find()
    .then((things) => {
      res.status(200).json(things);
    })
    .catch((error) => res.status(400).json({ error }));
});

module.exports = app;
