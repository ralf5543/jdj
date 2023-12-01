import {
  CHANGE_LOGIN_FIELD,
  HANDLE_SUCCESSFUL_LOGIN,
  CHANGE_SIGNUP_FIELD,
  HANDLE_SUCCESSFUL_SIGNUP,
  HANDLE_SIGNUP_VISIBILITY,
  HANDLE_LOGIN_VISIBILITY,
} from '../actions/user';

export const initialState = {
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
};

/* reducer qui s'occupe de ce qui concerne l'utilisateur */
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CHANGE_SIGNUP_FIELD:
      return {
        ...state,
        [action.identifier]: action.newValue,
      };
    /*
      avec les ifs, si on ajoute un champ dans le formulaire il faut ajouter
      un nouveau if.
      Avec cette syntaxe, le reducer est prêt pour n'importe quel ajout de champ
      MAIS il faut que le nom du champ dans le state soit présent dans le payload
      de l'action
    */

    case HANDLE_SUCCESSFUL_SIGNUP:
      return {
        ...state,
        nickname: action.nickname,
        token: action.token,
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
    /*
      avec les ifs, si on ajoute un champ dans le formulaire il faut ajouter
      un nouveau if.
      Avec cette syntaxe, le reducer est prêt pour n'importe quel ajout de champ
      MAIS il faut que le nom du champ dans le state soit présent dans le payload
      de l'action
    */

    case HANDLE_SUCCESSFUL_LOGIN:
      return {
        ...state,
        logged: true,
        nickname: action.nickname,
        token: action.token,
        // sécurité : on efface les identifiants dans le state dès qu'on en a
        // plus besoin
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