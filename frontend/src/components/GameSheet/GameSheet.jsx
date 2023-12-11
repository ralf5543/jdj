/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import './GameSheet.scss';
import { Navigate, useParams } from 'react-router-dom';
import Page from '../genericComponents/Page/Page';
import store from '../../store';
import {
  fetchGames,
  modifyGame,
  changeGameTitleField,
  changeGameDescriptionField,
  changeGameMaxPlayersField,
  changeGameIdealPlayersField,
  changeGameDurationField,
} from '../../actions/games';

import FormModifyGame from '../UserSpace/FormModifyGame/FormModifyGame';

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

  const gameTitleValue = useSelector((state) => state.games.gameTitle);
  const gameDescriptionValue = useSelector(
    (state) => state.games.gameDescription
  );
  const gameMaxPlayersValue = useSelector(
    (state) => state.games.gameMaxPlayers
  );
  const gameIdealPlayersValue = useSelector(
    (state) => state.games.gameIdealPlayers
  );
  const gameDurationValue = useSelector((state) => state.games.gameDuration);
  const gameVisualValue = useSelector((state) => state.games.gameVisual);

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

      <h1>Modification de la fiche du jeu</h1>
      <FormModifyGame
        currentGameId={currentGame._id}
        gameTitle={gameTitleValue}
        gameDescription={gameDescriptionValue}
        gameMaxPlayers={gameMaxPlayersValue}
        gameIdealPlayers={gameIdealPlayersValue}
        gameDuration={gameDurationValue}
        gameVisual={gameVisualValue}
        changeTitleField={(newValue, gameTitleField) => {
          const action = changeGameTitleField(newValue, gameTitleField);
          dispatch(action);
        }}
        changeDescriptionField={(newValue, gameDescriptionField) => {
          const action = changeGameDescriptionField(
            newValue,
            gameDescriptionField
          );
          dispatch(action);
        }}
        changeMaxplayersField={(newValue, gameMaxPlayersField) => {
          const action = changeGameMaxPlayersField(
            // Number, because we want a number type, frome a text field
            Number(newValue),
            gameMaxPlayersField
          );
          dispatch(action);
        }}
        changeIdealPlayersField={(newValue, gameIdealPlayersField) => {
          const action = changeGameIdealPlayersField(
            Number(newValue),
            gameIdealPlayersField
          );
          dispatch(action);
        }}
        changeDurationField={(newValue, gameDurationField) => {
          const action = changeGameDurationField(
            Number(newValue),
            gameDurationField
          );
          dispatch(action);
        }}
        handleModifyGame={() => {
          // le traitement placé ici est déclenché à la soumission du formulaire
          dispatch(modifyGame());
        }}
      />
    </Page>
  );
};

export default GameSheet;
