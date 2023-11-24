/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { useState, useEffect } from 'react';
import './App.scss';
import axios from 'axios';
import UserSpace from '../UserSpace/UserSpace';
import GamesListing from '../GamesListing/GamesListing';

function App() {
  const [games, setGames] = useState([]);

  const loadGames = () => {
    console.log('il faut charger les jeux');

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

  const addNewGame = () => {
    axios
      .post(
        // URL
        'http://localhost:3000/api/stuff',
        // paramètres
        {
          title: 'aaaaaaaaaa',
          description: '{ type: String, required: true }',
          imageUrl: 'https://picsum.photos/300/300',
          userId: 'zzzzzzzzzzzzz',
          price: 67867868,
        }
      )
      .then((response) => {
        console.log('affichage de la liste de jeux : ', response.data);
        setGames(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log('erreur de la response : ', error.response);
        } else if (error.request) {
          console.log('erreur de la request : ', error.request);
        } else if (error.message) {
          console.log('erreur du message : ', error.message);
        }

        console.log('erreur de la requete : ', error);
      })
      .finally(() => {
        console.log('le Finally qui sert à rien');
      });
  };

  useEffect(() => {
    console.log('allleeeeeeeeeez');
    loadGames();
  }, []);

  return (
    <div className="App">
      <button onClick={addNewGame} type="button">
        ajouter un jeu
      </button>
      <button onClick={loadGames} type="button">
        Afficher la liste
      </button>

      <GamesListing games={games} />
    </div>
  );
}

export default App;
