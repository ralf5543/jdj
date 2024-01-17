import {
  SAVE_USERS,
  CHANGE_LOGIN_FIELD,
  HANDLE_SUCCESSFUL_LOGIN,
  CHANGE_SIGNUP_FIELD,
  HANDLE_SUCCESSFUL_SIGNUP,
  HANDLE_SIGNUP_VISIBILITY,
  HANDLE_LOGIN_VISIBILITY,
} from '../actions/user';

export const initialState = {
  users: [],
  signupVisible: false,
  loginVisible: false,
  // indique si l'utilisateur est authentifié
  logged: false,
  // contenu de l'input du formulaire pour l'e-mail
  email: '',
  // contenu de l'input du formulaire pour le mot de passe
  password: '',
  // pseudo de l'utilisateur
  nickname: '',
  // token
  token: '',
  userId: '',
  userNickname: '',
};

/* reducer qui s'occupe de ce qui concerne l'utilisateur */
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_USERS:
      return {
        ...state,
        list: action.users,
        // areGamesLoaded: true,
      };

    case CHANGE_SIGNUP_FIELD:
      return {
        ...state,
        [action.identifier]: action.newValue,
      };

    case HANDLE_SUCCESSFUL_SIGNUP:
      return {
        ...state,
        // sécurité : on efface les identifiants dans le state dès qu'on en a
        // plus besoin
        email: '',
        password: '',
        signupVisible: false,
        loginVisible: false,
      };
    case CHANGE_LOGIN_FIELD:
      return {
        ...state,
        [action.identifier]: action.newValue,
      };

    case HANDLE_SUCCESSFUL_LOGIN:
      return {
        ...state,
        logged: true,
        nickname: action.nickname,
        token: action.token,
        userId: action.userId,
        // sécurité : on efface les identifiants dans le state dès qu'on en a plus besoin
        email: '',
        password: '',
        loginVisible: false,
        signupVisible: false,
      };

    case HANDLE_SIGNUP_VISIBILITY:
      return {
        ...state,
        signupVisible: true,
        loginVisible: false,
        email: '',
        password: '',
      };

    case HANDLE_LOGIN_VISIBILITY:
      return {
        ...state,
        signupVisible: false,
        loginVisible: true,
        email: '',
        password: '',
      };

    default:
      return state;
  }
};

export default reducer;
