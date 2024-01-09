/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import './App.scss';
import { useSelector, useDispatch } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import { fetchGames } from '../../actions/games';
import AppHeader from '../AppHeader/AppHeader';
import Toaster from '../genericComponents/Toaster/Toaster';

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
    </>
  );
};

type Props = {
  [key: string]: {
    toasterVisible: boolean;
  };
};

export default App;
