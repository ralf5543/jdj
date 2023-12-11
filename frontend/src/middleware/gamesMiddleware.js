/* eslint-disable @typescript-eslint/no-var-requires */
import axios from 'axios';
import {
  FETCH_GAMES,
  POST_GAME,
  MODIFY_GAME,
  saveGames,
} from '../actions/games';

const gamesMiddleware = (store) => (next) => (action) => {
  // console.log('action.type : ', action.type);
  switch (action.type) {
    case FETCH_GAMES:
      // console.log('aller chercher les jeux');
      axios
        .get('http://localhost:3000/api/games')
        .then((response) => {
          console.log('affichage de la liste de jeux : ', response.data);
          store.dispatch(saveGames(response.data));
        })
        .catch((error) => {
          console.log('erreur de la requete : ', error);
        });
      break;

    case POST_GAME:
      console.log('token dans le state : ', store.getState().user.token);
      axios
        .post(
          // URL
          'http://localhost:3000/api/games',
          // paramètres
          {
            title: store.getState().games.gameTitle,
            description: store.getState().games.gameDescription,
            maxplayers: store.getState().games.gameMaxPlayers,
            idealplayers: store.getState().games.gameIdealPlayers,
            duration: store.getState().games.gameDuration,
            visual: `http://localhost:3000/images/${
              store.getState().games.gameVisual
            }`,
          },
          // options (notamment les headers)
          {
            headers: {
              // nom: contenu
              // on fournit le token JWT dans le header Authorization, en faisant
              // précéder par le mot Bearer
              Authorization: `Bearer ${store.getState().user.token}`,
            },
          }
        )
        .then((response) => {
          console.log('on poste ce jeu : ', store.getState().games.gameTitle);
        })
        .catch((error) => {
          if (error.response) {
            console.log('erreur de la response : ', error.response);
          } else if (error.request) {
            console.log('erreur de la request : ', error.request);
          } else if (error.message) {
            console.log('erreur du message : ', error.message);
          }
        })
        .finally(() => {
          // refetch la liste de jeux mise à jour
          axios
            .get('http://localhost:3000/api/games')
            .then((response) => {
              console.log(
                'affichage de la nouvelle liste de jeux : ',
                response.data
              );
              store.dispatch(saveGames(response.data));
            })
            .catch((error) => {
              console.log('erreur de la requete : ', error);
            });
        });
      break;

    case MODIFY_GAME:
      axios
        .put(
          // URL
          `http://localhost:3000/api/games/${
            store.getState().games.currentGameId
          }`,
          // paramètres
          {
            title: store.getState().games.gameTitle,
            description: store.getState().games.gameDescription,
            maxplayers: store.getState().games.gameMaxPlayers,
            idealplayers: store.getState().games.gameIdealPlayers,
            duration: store.getState().games.gameDuration,
            visual: `http://localhost:3000/images/${
              store.getState().games.gameVisual
            }`,
          },
          {
            headers: {
              Authorization: `Bearer ${store.getState().user.token}`,
            },
          }
        )
        .then(() => {
          console.log('on modifie ce jeu : ', store.getState().games.gameTitle);
        })
        .catch((error) => {
          if (error.response) {
            console.log('erreur de la response : ', error.response);
          } else if (error.request) {
            console.log('erreur de la request : ', error.request);
          } else if (error.message) {
            console.log('erreur du message : ', error.message);
          }
        })
        .finally(() => {
          // refetch la liste de jeux mise à jour
          axios
            .get('http://localhost:3000/api/games')
            .then((response) => {
              console.log(
                'affichage de la nouvelle liste de jeux : ',
                response.data
              );
              store.dispatch(saveGames(response.data));
            })
            .catch((error) => {
              console.log('erreur de la requete : ', error);
            });
        });

      break;

    default:
  }

  // on passe l'action au suivant (middleware suivant ou reducer)
  next(action);
};

export default gamesMiddleware;
