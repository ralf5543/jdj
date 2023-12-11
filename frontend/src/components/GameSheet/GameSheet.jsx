/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import './GameSheet.scss';
import { Navigate, useParams } from 'react-router-dom';
import Page from '../genericComponents/Page/Page';
import store from '../../store';
import { fetchGames } from '../../actions/games';

const GameSheet = () => {
  const { id } = useParams();

  const games = useSelector((state) => state.games.list);

  const [deletedGame, setDeletedGame] = useState(false);

  // find the first element with the id matching the slug
  const currentGame = games.find((element) => element._id === id);
  const { title, visual, description, maxplayers, idealplayers } = currentGame;

  const dispatch = useDispatch();

  const deleteGame = (gameId) => {
    axios
      .delete(
        `http://localhost:3000/api/games/${gameId}`,
        // options (notamment les headers)
        {
          headers: {
            // nom: contenu
            // on fournit le token JWT dans le header Authorization, en faisant
            // précéder par le mot Bearer
            Authorization: `Bearer ${store.getState().user.token}`,
          },
        }
      )
      .then(() => {
        console.log('Suppression du  jeu ', title);

        // Recharge la liste
        dispatch(fetchGames());

        // Go back to home page
        setDeletedGame(true);
      })
      .catch((error) => {
        console.log('erreur de la requete : ', error);
        if (error.response.status === 401) {
          console.log("Le user id n'est pas celui de l'article");
        }
      });
  };

  return (
    <Page>
      <div>
        <h2 className="boardgame-card_title">{title}</h2>
        <img src={visual} alt="" />
        <p className="boardgame-card_description">{description}</p>
        <p className="boardgame-card_maxplayers">
          Nombre de joueurs MAX : {maxplayers}
        </p>
        <p className="boardgame-card_idealplayers">
          Nombre de joueurs idéal : {idealplayers}
        </p>
        <button
          onClick={() => {
            deleteGame(id);
          }}
          type="button"
        >
          Supprimer ce jeu
        </button>
        <p>(Vous devez être l'auteur de cette page pour la supprimer)</p>
      </div>
      {deletedGame && <Navigate to="/" replace />}
    </Page>
  );
};

export default GameSheet;
