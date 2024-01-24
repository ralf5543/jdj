/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import './App.scss';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { fetchGames } from '../../actions/games';
import { fetchUsers, handleSuccessfulLogin } from '../../actions/user';
import AppHeader from '../AppHeader/AppHeader';
import Toaster from '../genericComponents/Toaster/Toaster';
import AppFooter from '../AppFooter/AppFooter';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const action = fetchGames();
    dispatch(action);
  }, [dispatch]);

  useEffect(() => {
    const action = fetchUsers();
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
    const loggedInToken = localStorage.getItem('token');
    const loggedInOwnedGames = localStorage.getItem('ownedGames');

    if (loggedInUser) {
      // nickname, token, user id, owned games
      dispatch(
        handleSuccessfulLogin(
          loggedInNickname,
          loggedInToken,
          loggedInUser,
          // change data into array
          JSON.parse(loggedInOwnedGames)
        )
      );
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
