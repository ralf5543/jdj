// ici on placera les actions qui concernent l'utilisateur
// intention : changer la valeur de l'un des champs du formulaire d'authentification
export const CHANGE_SIGNUP_FIELD = 'CHANGE_SIGNUP_FIELD';
export const SUBMIT_SIGNUP = 'SUBMIT_SIGNUP';
export const CHANGE_LOGIN_FIELD = 'CHANGE_LOGIN_FIELD';
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const HANDLE_SUCCESSFUL_LOGIN = 'HANDLE_SUCCESSFUL_LOGIN';
export const HANDLE_SUCCESSFUL_SIGNUP = 'HANDLE_SUCCESSFUL_SIGNUP';

export const changeSignupField = (newValue, identifier) => ({
  type: CHANGE_SIGNUP_FIELD,
  newValue,
  identifier,
});

export const submitSignup = () => ({
  type: SUBMIT_SIGNUP,
});

export const handleSuccessfulSignup = (nickname, token) => ({
  type: HANDLE_SUCCESSFUL_SIGNUP,
  nickname,
  token,
});

export const changeLoginField = (newValue, identifier) => ({
  type: CHANGE_LOGIN_FIELD,
  newValue,
  identifier,
});

export const submitLogin = () => ({
  type: SUBMIT_LOGIN,
});

export const handleSuccessfulLogin = (nickname, token) => ({
  type: HANDLE_SUCCESSFUL_LOGIN,
  nickname,
  token,
});
// Note : on peut aussi avoir logged en payload, ou alors le reducer se débrouille
// en mettant touours "true"
