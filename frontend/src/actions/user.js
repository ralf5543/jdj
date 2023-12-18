// ici on placera les actions qui concernent l'utilisateur
// intention : changer la valeur de l'un des champs du formulaire d'authentification
export const CHANGE_SIGNUP_FIELD = 'CHANGE_SIGNUP_FIELD';
export const SUBMIT_SIGNUP = 'SUBMIT_SIGNUP';
export const CHANGE_LOGIN_FIELD = 'CHANGE_LOGIN_FIELD';
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const HANDLE_SUCCESSFUL_LOGIN = 'HANDLE_SUCCESSFUL_LOGIN';
export const HANDLE_SUCCESSFUL_SIGNUP = 'HANDLE_SUCCESSFUL_SIGNUP';
export const HANDLE_SIGNUP_VISIBILITY = 'HANDLE_SIGNUP_VISIBILITY';
export const HANDLE_LOGIN_VISIBILITY = 'HANDLE_LOGIN_VISIBILITY';

export const changeSignupField = (newValue, identifier) => ({
  type: CHANGE_SIGNUP_FIELD,
  newValue,
  identifier,
});

export const submitSignup = () => ({
  type: SUBMIT_SIGNUP,
});

export const handleSuccessfulSignup = () => ({
  type: HANDLE_SUCCESSFUL_SIGNUP,
});

export const changeLoginField = (newValue, identifier) => ({
  type: CHANGE_LOGIN_FIELD,
  newValue,
  identifier,
});

export const submitLogin = () => ({
  type: SUBMIT_LOGIN,
});

export const handleSuccessfulLogin = (
  nickname,
  token,
  userId,
  userNickname
) => ({
  type: HANDLE_SUCCESSFUL_LOGIN,
  nickname,
  token,
  userId,
  userNickname,
});

export const handleSignupVisibility = () => ({
  type: HANDLE_SIGNUP_VISIBILITY,
});

export const handleLoginVisibility = () => ({
  type: HANDLE_LOGIN_VISIBILITY,
});
