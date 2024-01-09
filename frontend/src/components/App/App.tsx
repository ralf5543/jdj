/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import './App.scss';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { fetchGames } from '../../actions/games';
import { handleSuccessfulLogin } from '../../actions/user';
import AppHeader from '../AppHeader/AppHeader';
import Toaster from '../genericComponents/Toaster/Toaster';
import AppFooter from '../AppFooter/AppFooter';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const action = fetchGames();
    dispatch(action);
  }, [dispatch]);

  const toaster = useSelector(
    (state: Props) => state.toasterReducer.toasterVisible
  );

  const isModalVisible = useSelector(
    (state: Props) => state.layoutReducer.modalVisible
  );

  // To refresh page without losing connexion (in fact, REconnect)
  useEffect(() => {
    const loggedInUser = localStorage.getItem('userId');
    const loggedInNickname = localStorage.getItem('nickname');

    if (loggedInUser) {
      // nickname, token NOT sent, user id
      dispatch(handleSuccessfulLogin(loggedInNickname, '', loggedInUser));
    }
  }, [dispatch]);

  return (
    <>
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
    </>
  );
};

type Props = {
  [key: string]: {
    toasterVisible: boolean;
  };
};

export default App;
