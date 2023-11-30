import axios from 'axios';
import { SUBMIT_LOGIN, handleSuccessfulLogin } from '../actions/user';

const userMiddleware = (store) => (next) => (action) => {
  // console.log('on a intercepté une action dans le middleware: ', action);

  switch (action.type) {
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
          console.log(response);
          // on a 3 infos dans response.data : pseudo, logged, token
          store.dispatch(
            handleSuccessfulLogin(response.data.pseudo, response.data.token)
          );
        })
        .catch((error) => {
          console.log('erreur lors du login : ', error);
        });
      break;

    default:
  }

  // on passe l'action au suivant (middleware suivant ou reducer)
  next(action);
};

export default userMiddleware;
