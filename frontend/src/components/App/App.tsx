/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { Routes, Route } from 'react-router';
import { useEffect } from 'react';
import './App.scss';
import { useDispatch } from 'react-redux';
import UserSpace from '../UserSpace/UserSpace';
import { fetchGames } from '../../actions/games';
import Error from '../Error/Error';
import Home from '../Home/Home';
import AppHeader from '../AppHeader/AppHeader';
import GameSheet from '../GameSheet/GameSheet';
import Toaster from '../genericComponents/Toaster/Toaster';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const action = fetchGames();
    dispatch(action);
  }, [dispatch]);

  return (
    <div className="App">
      <Toaster text="Bravo, t'es connecté !" />
      <AppHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-space" element={<UserSpace />} />
        <Route path="/game/:id" element={<GameSheet />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
