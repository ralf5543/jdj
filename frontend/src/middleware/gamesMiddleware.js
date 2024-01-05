import axios from '../utils/axios';

import {
  FETCH_GAMES,
  POST_GAME,
  MODIFY_GAME,
  DELETE_GAME,
  saveGames,
} from '../actions/games';
import { hideModal, showLoader, hideLoader } from '../actions/layout';

const gamesMiddleware = (store) => (next) => (action) => {
  // console.log('action.type : ', action.type);
  switch (action.type) {
    case FETCH_GAMES:
      // console.log('aller chercher les jeux');

      store.dispatch(showLoader());

      axios
        .get('/api/games')
        .then((response) => {
          console.log('affichage de la liste de jeux : ', response.data);
          store.dispatch(saveGames(response.data));
        })
        .catch((error) => {
          console.log('erreur de la requete : ', error);
        })
        .finally(() => {
          store.dispatch(hideLoader());
        });
      break;

    case POST_GAME:
      store.dispatch(showLoader());
      console.log('token dans le state : ', store.getState().user.token);
      axios
        .post(
          // URL
          '/api/games',
          // paramètres
          {
            title: store.getState().gamesReducer.gameTitle,
            description: store.getState().gamesReducer.gameDescription,
            maxplayers: store.getState().gamesReducer.gameMaxPlayers,
            idealplayers: store.getState().gamesReducer.gameIdealPlayers,
            duration: store.getState().gamesReducer.gameDuration,
            userNickname: store.getState().user.nickname,
            visual: `${import.meta.env.VITE_BASE_URL}/images/${
              store.getState().gamesReducer.gameVisual
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
          console.log(
            'on poste ce jeu : ',
            store.getState().gamesReducer.gameTitle
          );
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
          store.dispatch(hideModal());

          // refetch la liste de jeux mise à jour
          axios
            .get('/api/games')
            .then((response) => {
              console.log(
                'affichage de la nouvelle liste de jeux : ',
                response.data
              );
              store.dispatch(saveGames(response.data));
            })
            .catch((error) => {
              console.log('erreur de la requete : ', error);
            })
            .finally(() => {
              store.dispatch(hideLoader());
            });
        });
      break;

    case MODIFY_GAME:
      store.dispatch(showLoader());
      axios
        .put(
          // URL
          `/api/games/${store.getState().gamesReducer.currentGameId}`,
          // paramètres
          {
            title: store.getState().gamesReducer.gameTitle,
            description: store.getState().gamesReducer.gameDescription,
            maxplayers: store.getState().gamesReducer.gameMaxPlayers,
            idealplayers: store.getState().gamesReducer.gameIdealPlayers,
            duration: store.getState().gamesReducer.gameDuration,
            visual: `/images/${store.getState().gamesReducer.gameVisual}`,
          },
          {
            headers: {
              Authorization: `Bearer ${store.getState().user.token}`,
            },
          }
        )
        .then(() => {
          console.log(
            'on modifie ce jeu : ',
            store.getState().gamesReducer.gameTitle
          );
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
            .get('/api/games')
            .then((response) => {
              console.log(
                'affichage de la nouvelle liste de jeux : ',
                response.data
              );
              store.dispatch(saveGames(response.data));
            })
            .catch((error) => {
              console.log('erreur de la requete : ', error);
            })
            .finally(() => {
              store.dispatch(hideLoader());
            });
        });

      break;

    case DELETE_GAME:
      store.dispatch(showLoader());
      axios
        .delete(
          // URL
          `/api/games/${store.getState().gamesReducer.currentGameId}`,
          // paramètres
          {
            headers: {
              // nom: contenu
              // on fournit le token JWT dans le header Authorization, en faisant
              // précéder par le mot Bearer
              Authorization: `Bearer ${store.getState().user.token}`,
            },
          }
        )
        .then(() => {
          // Recharge la liste
          // dispatch(fetchGames());
          // Go back to home page
          // setDeletedGame(true);
        })
        .catch((error) => {
          console.log('erreur de la requete : ', error);
          if (error.response.status === 401) {
            console.log("Le user id n'est pas celui de l'article");
          }
        })
        .finally(() => {
          // refetch la liste de jeux mise à jour
          axios
            .get('/api/games')
            .then((response) => {
              console.log(
                'affichage de la nouvelle liste de jeux : ',
                response.data
              );
              store.dispatch(saveGames(response.data));
            })
            .catch((error) => {
              console.log('erreur de la requete : ', error);
            })
            .finally(() => {
              store.dispatch(hideLoader());
            });
        });

      break;

    default:
  }

  // on passe l'action au suivant (middleware suivant ou reducer)
  next(action);
};

export default gamesMiddleware;
