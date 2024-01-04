/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './GameSheet.scss';
import { Navigate, useParams } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Page from '../genericComponents/Page/Page';
import {
  deleteGame,
  changeGameTitleField,
  changeGameDescriptionField,
  changeGameMaxPlayersField,
  changeGameIdealPlayersField,
  changeGameDurationField,
  changeCurrentGameId,
} from '../../actions/games';

import FormModifyGame from '../UserSpace/FormModifyGame/FormModifyGame';

const GameSheet = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  // changes the current game ID in the store
  useEffect(() => {
    const action = changeCurrentGameId(id);
    dispatch(action);
  }, [dispatch, id]);

  const games = useSelector((state: Props) => state.gamesReducer.list);

  const [deletedGame, setDeletedGame] = useState<boolean>(false);

  // find the first element with the id matching the slug
  const currentGame = games.find((element) => element._id === id);
  const { title, visual, description, maxplayers, idealplayers } = currentGame;

  console.log('currentGame : ', currentGame);

  const handleDeleteGame = (gameId: string | undefined) => {
    dispatch(deleteGame());

    // Route => home
    setDeletedGame(true);
  };

  const gameTitleValue = useSelector(
    (state: Props) => state.gamesReducer.gameTitle
  );
  const gameDescriptionValue = useSelector(
    (state: Props) => state.gamesReducer.gameDescription
  );
  const gameMaxPlayersValue = useSelector(
    (state: Props) => state.gamesReducer.gameMaxPlayers
  );
  const gameIdealPlayersValue = useSelector(
    (state: Props) => state.gamesReducer.gameIdealPlayers
  );
  const gameDurationValue = useSelector(
    (state: Props) => state.gamesReducer.gameDuration
  );

  return (
    <Page>
      <div>
        <h2 className="boardgame-card_title">{title}</h2>
        <LazyLoadImage src={visual} alt={`Visual of ${title} game`} />
        <p className="boardgame-card_description">{description}</p>
        <p className="boardgame-card_maxplayers">
          Nombre de joueurs MAX : {maxplayers}
        </p>
        <p className="boardgame-card_idealplayers">
          Nombre de joueurs idéal : {idealplayers}
        </p>
        <button
          onClick={() => {
            handleDeleteGame(id);
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
        gameTitle={gameTitleValue}
        gameDescription={gameDescriptionValue}
        gameMaxPlayers={gameMaxPlayersValue}
        gameIdealPlayers={gameIdealPlayersValue}
        gameDuration={gameDurationValue}
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
      />
    </Page>
  );
};

type Props = {
  [key: string]: {
    gameTitle: string;
    gameDescription: string;
    gameMaxPlayers: string;
    gameIdealPlayers: string;
    gameDuration: string;
    gameVisual: string;
    list: Array<object>;
  };
};

export default GameSheet;
