/* eslint-disable react/no-unescaped-entities */
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './Navigation.scss';

import { AnimatePresence } from 'framer-motion';
import LoginForm from '../../LoginForm/LoginForm';
import {
  changeLoginField,
  changeSignupField,
  submitSignup,
  submitLogin,
  handleSignupVisibility,
  handleLoginVisibility,
} from '../../../actions/user';
import { showModal } from '../../../actions/layout';
import SignupForm from '../../SignupForm/SignupForm';
import Modal from '../../genericComponents/Modal/Modal';

const Navigation = () => {
  const emailValue = useSelector((state: Props) => state.user.email);
  const passwordValue = useSelector((state: Props) => state.user.password);
  const nicknameValue = useSelector((state: Props) => state.user.nickname);
  const isLogged = useSelector((state: Props) => state.user.logged);
  const isModalVisible = useSelector(
    (state: Props) => state.layoutReducer.modalVisible
  );
  const isLoginVisible = useSelector((state: Props) => state.user.loginVisible);
  const isSignupVisible = useSelector(
    (state: Props) => state.user.signupVisible
  );

  // close modals (no other use)
  const cancelSignup = () => {};

  const cancelLogin = () => {};

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  const dispatch = useDispatch();

  return (
    <nav className="main-nav">
      <ul className="main-nav_items">
        <li className="main-nav_items_item">
          <NavLink
            className={({ isActive }) => (isActive ? 'current' : '')}
            to="/"
          >
            <span className="fa-solid fa-home" />
            Accueil
          </NavLink>
        </li>
        {isLogged && (
          <li className="main-nav_items_item">
            <NavLink
              className={({ isActive }) => (isActive ? 'current' : '')}
              to="/user-space"
            >
              <span className="fa-solid fa-user" />
              Espace perso
            </NavLink>
          </li>
        )}
        {isLogged ? (
          <li className="main-nav_items_item">
            {/*  <h1 className="login-form-message">{`Bienvenue ${nicknameValue}`}</h1> */}
            <button type="button" className="link" onClick={handleLogout}>
              Déconnexion
            </button>
          </li>
        ) : (
          <>
            <li className="main-nav_items_item">
              <button
                type="button"
                className="link"
                onClick={() => {
                  dispatch(handleLoginVisibility());
                  dispatch(showModal());
                }}
              >
                Se connnecter
              </button>
            </li>
            <li className="main-nav_items_item">
              <button
                type="button"
                className="link"
                onClick={() => {
                  dispatch(handleSignupVisibility());
                  dispatch(showModal());
                }}
              >
                Créer un compte
              </button>
            </li>
          </>
        )}
        <AnimatePresence>
          {isSignupVisible && isModalVisible && (
            <Modal closeModal={cancelSignup}>
              <SignupForm
                email={emailValue}
                password={passwordValue}
                nickname={nicknameValue}
                changeField={(newValue, identifier) => {
                  const action = changeSignupField(newValue, identifier);
                  dispatch(action);
                }}
                handleSignup={() => {
                  dispatch(submitSignup());
                }}
              />
            </Modal>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isLoginVisible && isModalVisible && (
            <Modal closeModal={cancelLogin}>
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
            </Modal>
          )}
        </AnimatePresence>
      </ul>
    </nav>
  );
};

type Props = {
  [key: string]: {
    modalVisible: boolean;
    signupVisible: boolean;
    loginVisible: boolean;
    logged: boolean;
    email: string;
    password: string;
    nickname: string;
  };
};

export default Navigation;
