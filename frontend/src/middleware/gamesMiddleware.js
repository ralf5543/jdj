import axios from '../utils/axios';

import {
  FETCH_GAMES,
  POST_GAME,
  MODIFY_GAME,
  DELETE_GAME,
  saveGames,
} from '../actions/games';
import {
  hideModal,
  showLoader,
  hideLoader,
  showToaster,
} from '../actions/layout';
import { fetchUsers, modifyProfile } from '../actions/user';

const gamesMiddleware = (store) => (next) => (action) => {
  // console.log('action.type : ', action.type);
  switch (action.type) {
    case FETCH_GAMES:
      // console.log('aller chercher les jeux');

      store.dispatch(showLoader());

      axios
        .get('/api/games')
        .then((response) => {
          // console.log('affichage de la liste de jeux : ', response.data);
          store.dispatch(saveGames(response.data));
        })
        .catch((error) => {
          console.log('erreur de la requete : ', error);
          store.dispatch(
            showToaster(
              'error',
              "La liste n'a pas pu être chargée correctement"
            )
          );
        })
        .finally(() => {
          store.dispatch(hideLoader());
        });
      break;

    case POST_GAME:
      store.dispatch(showLoader());
      axios
        .post(
          // URL
          '/api/games',
          // paramètres
          {
            title: store.getState().gamesReducer.gameTitle,
            description: store.getState().gamesReducer.gameDescription,
            minplayers: store.getState().gamesReducer.gameMinPlayers,
            maxplayers: store.getState().gamesReducer.gameMaxPlayers,
            idealplayers: store.getState().gamesReducer.gameIdealPlayers,
            duration: store.getState().gamesReducer.gameDuration,
            confrontation: store.getState().gamesReducer.gameConfrontation,
            userNickname: store.getState().user.nickname,
            visual: store.getState().gamesReducer.gameVisual,
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
        .then(() => {
          /* rechercher un objet game dont le userId est égal à l'id de l'user (et qui n'est )
          utilisé par personne ?), récupérer son id et l'ajouter à la liste de jeux de l'user */

          /* axios
            .put(
              // URL
              `/api/auth/${store.getState().user.userId}`,
              // paramètres
              {
                ownedGames: [...store.getState().user.ownedGames, _id],
              },
              {
                headers: {
                  Authorization: `Bearer ${store.getState().user.token}`,
                },
              }
            )
            .then(() => {
              dispatch(modifyProfile(newValue));
              dispatch(fetchUsers());
            })
            .catch((error) => {
              console.log('erreur de la requete : ', error);
              dispatch(showToaster('error', "Une erreur s'est produite"));
            })
            .finally(() => {
              dispatch(hideLoader());
            }); */

          store.dispatch(showToaster('success', 'Nouveau jeu ajouté !'));
        })
        .catch((error) => {
          if (error.response) {
            console.log('erreur de la response : ', error.response);
          } else if (error.request) {
            console.log('erreur de la request : ', error.request);
          } else if (error.message) {
            console.log('erreur du message : ', error.message);
          }
          store.dispatch(showToaster('error', "Une erreur s'est produite"));
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
              // all games list updated
              const toto = store.getState().gamesReducer.list;

              // last game posted
              const tata = toto.slice(-1);

              // check if this last game is the one posted by current user
              if (tata[0].userId === store.getState().user.userId) {
                // get last game id
                // eslint-disable-next-line no-underscore-dangle
                const bbbb = tata[0]._id;
                console.log('bbbb : ', bbbb);

                const ccc = [...store.getState().user.ownedGames, bbbb];
                console.log('ccc : ', ccc);

                axios
                  .put(
                    // URL
                    `/api/auth/${store.getState().user.userId}`,
                    // paramètres
                    {
                      ownedGames: ccc,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${store.getState().user.token}`,
                      },
                    }
                  )
                  .then(() => {
                    store.dispatch(modifyProfile(ccc));
                    store.dispatch(fetchUsers());
                  })
                  .catch((error) => {
                    console.log('erreur de la requete : ', error);
                    store.dispatch(showToaster('error', "Une erreur s'est produite"));
                  })
                  .finally(() => {
                    store.dispatch(hideLoader());
                  });
              }

              console.log('toto: ', toto);
              console.log('tata[0]: ', tata[0]);
              console.log(
                'store.getState().user.userId : ',
                store.getState().user.userId
              );
              // console.log('aaaa: ', aaaa);
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
            minplayers: store.getState().gamesReducer.gameMinPlayers,
            maxplayers: store.getState().gamesReducer.gameMaxPlayers,
            idealplayers: store.getState().gamesReducer.gameIdealPlayers,
            duration: store.getState().gamesReducer.gameDuration,
            confrontation: store.getState().gamesReducer.gameConfrontation,
            visual: store.getState().gamesReducer.gameVisual,
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
          store.dispatch(hideModal());
          store.dispatch(showToaster('success', 'Fiche modifiée !'));
        })
        .catch((error) => {
          console.log('erreur de la requete : ', error);
          if (error.response.status === 401) {
            console.log("Le user id n'est pas celui de l'article");
            store.dispatch(
              showToaster('error', "Vous n'êtes pas l'auteur de cette page !")
            );
          } else {
            store.dispatch(showToaster('error', "Une erreur s'est produite"));
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
          store.dispatch(
            showToaster('success', 'La fiche du jeu a bien été supprimée')
          );
        })
        .catch((error) => {
          console.log('erreur de la requete : ', error);
          if (error.response.status === 401) {
            console.log("Le user id n'est pas celui de l'article");
            store.dispatch(
              showToaster('error', "Vous n'êtes pas l'auteur de cette page !")
            );
          } else {
            store.dispatch(showToaster('error', "Une erreur s'est produite"));
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
