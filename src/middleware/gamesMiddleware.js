import axios from 'axios';
import { FETCH_GAMES, POST_GAME, saveGames } from '../actions/games';

const gamesMiddleware = (store) => (next) => (action) => {
  // console.log('action.type : ', action.type);
  switch (action.type) {
    case FETCH_GAMES:
      // console.log('aller chercher les jeux');
      axios
        .get('http://localhost:3000/api/games')
        .then((response) => {
          // console.log(response);
          console.log('affichage de la liste de jeux : ', response.data);
          store.dispatch(saveGames(response.data));
        })
        .catch((error) => {
          console.log('erreur de la requete : ', error);
        })
        .finally(() => {
          // console.log('le Finally qui sert à rien');
        });
      break;

    case POST_GAME:
      console.log('poste un nouveau jeu');
      // console.log('avec comme ttitre : ', store.games.test);
      axios
        .post(
          // URL
          'http://localhost:3000/api/games',
          // paramètres
          {
            title: store.getState().games.test,
            description: 'Ceci est un jeu trop bien',
            maxplayers: 12,
            idealplayers: 1,
            duration: 6000,
          }
        )
        .then((response) => {
          console.log('on poste ce jeu : ', response.data);
        })
        .catch((error) => {
          if (error.response) {
            console.log('erreur de la response : ', error.response);
          } else if (error.request) {
            console.log('erreur de la request : ', error.request);
          } else if (error.message) {
            console.log('erreur du message : ', error.message);
          }

          console.log('erreur de la requete : ', error);
        })
        .finally(() => {
          console.log('le Finally qui sert à rien');
        });
      break;

    default:
  }

  // on passe l'action au suivant (middleware suivant ou reducer)
  next(action);
};

export default gamesMiddleware;
