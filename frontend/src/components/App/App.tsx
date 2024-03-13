/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.scss';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { ThemeContext } from '../../utils/context';
import axios from '../../utils/axios';
import { fetchGames } from '../../actions/games';
import {
  fetchUsers,
  handleSuccessfulLogin,
  modifyProfile,
} from '../../actions/user';
import AppHeader from '../AppHeader/AppHeader';
import Toaster from '../genericComponents/Toaster/Toaster';
import AppFooter from '../AppFooter/AppFooter';

const App = () => {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const dispatch = useDispatch();

  useEffect(() => {
    const action = fetchGames();
    dispatch(action);
  }, [dispatch]);

  useEffect(() => {
    const action = fetchUsers();
    dispatch(action);
  }, [dispatch]);

  const isLogged = useSelector((state: Props) => state.user.logged);
  const currentUserId = useSelector((state: Props) => state.user.userId);

  const toaster = useSelector(
    (state: Props) => state.toasterReducer.toasterVisible
  );

  const isModalVisible = useSelector(
    (state: Props) => state.layoutReducer.modalVisible
  );

  // =============------------------------- To refresh page without losing connexion (in fact, REconnect)
  useEffect(() => {
    const loggedInUser = localStorage.getItem('userId');
    const loggedInNickname = localStorage.getItem('nickname');
    const loggedInToken = localStorage.getItem('token');

    if (loggedInUser) {
      // nickname, token, user id
      dispatch(
        handleSuccessfulLogin(loggedInNickname, loggedInToken, loggedInUser)
      );
    }
  }, [dispatch]);

  useEffect(() => {
    if (isLogged) {
      axios
        .get(`/api/auth/${currentUserId}`)
        .then((response) => {
          dispatch(modifyProfile(response.data.ownedGames));
        })
        .catch((error) => {
          console.log('erreur de la requete : ', error);
        })
        .finally(() => {});
    }
  }, [dispatch, currentUserId, isLogged]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AppHeader />

      <AnimatePresence>{toaster && <Toaster />}</AnimatePresence>

      <main
        className={
          isModalVisible ? 'main-content modal-visible' : 'main-content'
        }
      >
        <Outlet />
      </main>

      <AppFooter />
    </ThemeContext.Provider>
  );
};

type Props = {
  [key: string]: {
    modalVisible: boolean;
    userId: string;
    logged: boolean;
    toasterVisible: boolean;
  };
};

export default App;
