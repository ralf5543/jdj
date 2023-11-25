/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { useEffect } from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import GamesListing from '../GamesListing/GamesListing';
import UserSpace from '../UserSpace/UserSpace';
import { fetchGames } from '../../actions/games';

const App = () => {
  const games = useSelector((state) => state.games.list);

  const dispatch = useDispatch();

  useEffect(() => {
    const action = fetchGames();
    dispatch(action);
  }, [dispatch]);

  const deleteGame = () => {
    axios
      .delete(
        // URL
        'http://localhost:3000/api/games/6561db86f9214b6364b7e3b2'
      )
      .then((response) => {
        console.log('affichage de la requete delete : ', response);
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

  /* const addNewGame = () => {
    axios
      .post(
        // URL
        'http://localhost:3000/api/games',
        // paramètres
        {
          title: 'Mon super jeu test',
          description: 'Ceci est un jeu trop bien',
          maxplayers: 6,
          idealplayers: 4,
          duration: 60,
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
  }; */

  return (
    <div className="App">
      <button onClick={deleteGame} type="button">
        Supprimer un jeu
      </button>

      <UserSpace />

      <GamesListing games={games} />
    </div>
  );
};

export default App;
