import axios from '../utils/axios';

import {
  SUBMIT_LOGIN,
  handleSuccessfulLogin,
  SUBMIT_SIGNUP,
  handleSuccessfulSignup,
} from '../actions/user';
import { hideModal, showToaster } from '../actions/layout';

const userMiddleware = (store) => (next) => (action) => {
  // console.log('on a intercepté une action dans le middleware: ', action);

  switch (action.type) {
    case SUBMIT_SIGNUP:
      // => undefined, on a oublié le tiroir, il faut store.getState().user.email
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
          store.dispatch(showToaster('error', "L'inscription a échoué..."));
        });
      break;

    case SUBMIT_LOGIN:
      console.log('store.getState().user.email : ', store.getState().user.email);
      console.log('store.getState().user.password : ', store.getState().user.password);
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
          console.log('bien connecté avec ce user : ', response.data);
          console.log('token reçu : ', response.data.token);
          console.log("id de l'user : ", response.data.userId);
          console.log("nickname de l'user : ", response.data.userNickname);
          // on a 2 infos dans response.data : pseudo et token
          store.dispatch(
            handleSuccessfulLogin(
              response.data.nickname,
              response.data.token,
              response.data.userId,
              response.data.userNickname
            )
          );
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

    default:
  }

  // on passe l'action au suivant (middleware suivant ou reducer)
  next(action);
};

export default userMiddleware;
