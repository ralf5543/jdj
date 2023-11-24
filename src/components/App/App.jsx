import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import UserSpace from '../UserSpace/UserSpace';
import GamesListing from '../GamesListing/GamesListing';

function App() {
  const [games, setGames] = useState([]);

  const loadGames = () => {
    // console.log('il faut charger les articles');

    axios
      .get('http://localhost:3000/api/stuff')
      .then((response) => {
        console.log('affichage de la liste de jeux : ', response.data);
        setGames(response.data);
      })
      .catch((error) => {
        console.log('erreur de la requete : ', error);
      })
      .finally(() => {
        console.log('le Finally qui sert à rien');
      });
  };

  useEffect(() => {
    loadGames();
  }, []);

  return (
    <div className="App">
      <button onClick={loadGames} type="button">
        Afficher la liste
      </button>
      <UserSpace />
      <GamesListing games={games} />
    </div>
  );
}

export default App;
