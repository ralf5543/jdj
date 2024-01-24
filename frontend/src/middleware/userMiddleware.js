import axios from '../utils/axios';

import {
  FETCH_USERS,
  SUBMIT_LOGIN,
  handleSuccessfulLogin,
  SUBMIT_SIGNUP,
  MODIFY_PROFILE,
  handleSuccessfulSignup,
  saveUsers,
} from '../actions/user';
import {
  showLoader,
  hideLoader,
  hideModal,
  showToaster,
} from '../actions/layout';

const userMiddleware = (store) => (next) => (action) => {
  // console.log('on a intercepté une action dans le middleware: ', action);

  switch (action.type) {
    case FETCH_USERS:
      axios
        .get('/api/auth')
        .then((response) => {
          // console.log('affichage de la liste de users : ', response.data);
          store.dispatch(saveUsers(response.data));
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
        .finally(() => {});
      break;

    case SUBMIT_SIGNUP:
      axios
        .post(
          // URL
          '/api/auth/signup',
          // informations
          {
            email: store.getState().user.email,
            password: store.getState().user.password,
            nickname: store.getState().user.nickname,
          }
        )
        .then((response) => {
          console.log(response);
          // on a 3 infos dans response.data : pseudo, logged, token
          store.dispatch(
            handleSuccessfulSignup(response.data.nickname, response.data.token)
          );
          store.dispatch(hideModal());
          store.dispatch(
            showToaster('success', 'Inscription terminée avec succès')
          );
        })
        .catch((error) => {
          console.log("erreur lors de l'inscription : ", error.message);
          store.dispatch(
            showToaster(
              'error',
              "L'inscription a échoué. Avez-vous rempli tous les champs ?"
            )
          );
        });
      break;

    case SUBMIT_LOGIN:
      axios
        .post(
          // URL
          '/api/auth/login',
          // informations
          {
            email: store.getState().user.email,
            password: store.getState().user.password,
          }
        )
        .then((response) => {
          store.dispatch(
            handleSuccessfulLogin(
              response.data.nickname,
              response.data.token,
              response.data.userId,
              response.data.ownedGames
            )
          );

          localStorage.setItem('nickname', response.data.nickname);
          localStorage.setItem('userId', response.data.userId);
          localStorage.setItem('token', response.data.token);

          // change the data into array
          localStorage.setItem('ownedGames', JSON.stringify(response.data.ownedGames));

          store.dispatch(hideModal());
          store.dispatch(
            showToaster('success', 'Vous êtes à présent connecté !')
          );
        })
        .catch((error) => {
          console.log('erreur login : ', error.request.response);
          store.dispatch(
            showToaster('error', 'Adresse email ou mot de passe incorrect(e)')
          );
        });
      break;

    case MODIFY_PROFILE:
      store.dispatch(showLoader());
      console.log('état du store : ', store.getState().user.ownedGames);
      axios
        .put(
          // URL
          `/api/auth/${store.getState().user.userId}`,
          // paramètres
          {
            ownedGames: store.getState().user.ownedGames,
          },
          {
            headers: {
              Authorization: `Bearer ${store.getState().user.token}`,
            },
          }
        )
        .then(() => {
          console.log(
            'on modifie cette liste : ',
            store.getState().user.ownedGames
          );
          store.dispatch(
            showToaster('success', 'Le jeu a été ajouté à votre collection !')
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
          store.dispatch(hideLoader());
        });

      break;

    default:
  }

  // on passe l'action au suivant (middleware suivant ou reducer)
  next(action);
};

export default userMiddleware;
