import { useSelector, useDispatch } from 'react-redux';

import './style.scss';

import LoginForm from '../LoginForm/LoginForm';
import {
  changeLoginField,
  changeSignupField,
  submitSignup,
  submitLogin,
  handleSignupVisibility,
  handleLoginVisibility,
} from '../../actions/user';
import SignupForm from '../SignupForm/SignupForm';

const AppHeader = () => {
  // /!\ ne pas oublier le nom du tiroir, state.email c'est undefined
  const emailValue = useSelector((state) => state.user.email);
  const passwordValue = useSelector((state) => state.user.password);
  const nicknameValue = useSelector((state) => state.user.nickname);
  const isLogged = useSelector((state) => state.user.logged);
  const isSignupVisible = useSelector((state) => state.user.signupVisible);
  const isLoginVisible = useSelector((state) => state.user.loginVisible);

  const dispatch = useDispatch();

  /*
  si on récupère le tiroir entier ?
  const { email, password } = useSelector((state) => state.user);
  => conséquence : on s'est abonné aux changements du tiroir, et pas au changement
  des infos dont on a besoin dans le tiroir, donc le composant AppHeader refait un
  rendu dès qu'une info change dans le tiroir, même si ça ne le concerne pas
  DONC c'est pas une bonne pratique, par rapport aux performances
  */

  return (
    <header className="header">
      <h1>Espace perso de {nicknameValue}</h1>
      {isLogged && (
        <div className="login-form-logged">
          <h1 className="login-form-message">{`Bienvenue ${nicknameValue}`}</h1>
          <button
            type="button"
            className="login-form-button"
            onClick={() => {
              console.log('handleLogout');
            }}
          >
            Déconnexion
          </button>
        </div>
      )}
      {!isLogged && (
        <>
          <button
            type="button"
            onClick={() => {
              const action = handleLoginVisibility();
              dispatch(action);
            }}
          >
            Se connnecter
          </button>
          <button
            type="button"
            onClick={() => {
              const action = handleSignupVisibility();
              dispatch(action);
            }}
          >
            Créer un compte
          </button>
        </>
      )}
      {isSignupVisible && (
        <SignupForm
          email={emailValue}
          password={passwordValue}
          nickname={nicknameValue}
          changeField={(newValue, identifier) => {
            const action = changeSignupField(newValue, identifier);
            dispatch(action);
          }}
          handleSignup={() => {
            const action = submitSignup();
            dispatch(action);
          }}
        />
      )}
      {isLoginVisible && (
        <LoginForm
          email={emailValue}
          password={passwordValue}
          changeField={(newValue, identifier) => {
            // on transmet les infos au store, pour le reducer user
            // ici pour les paramètres on met dans le même ordre que ce qu'on a
            // défini dans l'annuaire des actions
            const action = changeLoginField(newValue, identifier);
            dispatch(action);
          }}
          handleLogin={() => {
            // le traitement placé ici est déclenché à la soumission du formulaire
            const action = submitLogin();
            dispatch(action);
          }}
        />
      )}
    </header>
  );
};

export default AppHeader;
