import axios from 'axios';
import {
  SUBMIT_LOGIN,
  handleSuccessfulLogin,
  SUBMIT_SIGNUP,
  handleSuccessfulSignup,
} from '../actions/user';

const userMiddleware = (store) => (next) => (action) => {
  // console.log('on a intercepté une action dans le middleware: ', action);

  switch (action.type) {
    case SUBMIT_SIGNUP:
      // console.log(store.getState().email);
      // => undefined, on a oublié le tiroir, il faut store.getState().user.email
      axios
        .post(
          // URL
          'http://localhost:3000/api/auth/signup',
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
        })
        .catch((error) => {
          console.log("erreur lors de l'inscription : ", error.message);
        });
      break;

    case SUBMIT_LOGIN:
      // console.log(store.getState().email);
      // => undefined, on a oublié le tiroir, il faut store.getState().user.email
      axios
        .post(
          // URL
          'http://localhost:3000/api/auth/login',
          // informations
          {
            email: store.getState().user.email,
            password: store.getState().user.password,
          }
        )
        .then((response) => {
          console.log('bien connecté avec ce user : ', response.data);
          // on a 3 infos dans response.data : pseudo, logged, token
          store.dispatch(
            handleSuccessfulLogin(response.data.nickname, response.data.token)
          );
        })
        .catch((error) => {
          console.log('erreur lors du login : ', error.request.response);
        });
      break;

    default:
  }

  // on passe l'action au suivant (middleware suivant ou reducer)
  next(action);
};

export default userMiddleware;
