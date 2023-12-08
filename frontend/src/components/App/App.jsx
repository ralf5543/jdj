/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import GamesListing from '../GamesListing/GamesListing';
import UserSpace from '../UserSpace/UserSpace';
import AppHeader from '../AppHeader/AppHeader';
import { fetchGames } from '../../actions/games';

const App = () => {
  const games = useSelector((state) => state.games.list);

  const dispatch = useDispatch();

  useEffect(() => {
    const action = fetchGames();
    dispatch(action);
  }, [dispatch]);

  console.log('render de App');

  return (
    <div className="App">
      <AppHeader />
      <UserSpace />
      <GamesListing games={games} />
    </div>
  );
};

export default App;
