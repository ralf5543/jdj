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

  axios
    .get('http://localhost:3000/images/get-image')
    .then((response) => {
      // console.log(response);
      console.log('affichage de la liste dimages : ', response.data);
    })
    .catch((error) => {
      console.log('erreur de la requete : ', error);
    })
    .finally(() => {
      // console.log('le Finally qui sert à rien');
    });

  return (
    <div className="App">
      <AppHeader />
      <UserSpace />
      <GamesListing games={games} />
    </div>
  );
};

export default App;
