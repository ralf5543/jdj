/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './GameSheet.scss';
import { Navigate, useParams } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Page from '../genericComponents/Page/Page';
import Button from '../genericComponents/Button/Button';
import { showModal } from '../../actions/layout';

import {
  deleteGame,
  changeGameTitleField,
  changeGameDescriptionField,
  changeGameMinPlayersField,
  changeGameMaxPlayersField,
  changeGameIdealPlayersField,
  changeGameDurationField,
  changeCurrentGameId,
} from '../../actions/games';

import FormModifyGame from '../UserSpace/FormModifyGame/FormModifyGame';
import Modal from '../genericComponents/Modal/Modal';

const GameSheet = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  // changes the current game ID in the store
  useEffect(() => {
    dispatch(changeCurrentGameId(id));
  }, [dispatch, id]);

  const games = useSelector((state: Props) => state.gamesReducer.list);

  const [deletedGame, setDeletedGame] = useState<boolean>(false);

  // find the first element with the id matching the slug
  const currentGame = games.find((element) => element._id === id);
  const {
    title,
    visual,
    description,
    minplayers,
    maxplayers,
    idealplayers,
    duration,
  } = currentGame;

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
  const gameMinPlayersValue = useSelector(
    (state: Props) => state.gamesReducer.gameMinPlayers
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

  // ======================------------------- MODIFY GAME
  const [modifygame, setModifygame] = useState<boolean>(false);

  const isModalVisible = useSelector(
    (state: Props) => state.layoutReducer.modalVisible
  );

  const isLogged = useSelector((state: Props) => state.user.logged);

  const handleModifygameForm = () => {
    // Retrieves all games datas in the store, so the user doesn't have to rewrite infos
    dispatch(changeGameDescriptionField(title, 'gameTitle'));
    dispatch(changeGameDescriptionField(visual, 'gameVisual'));
    dispatch(changeGameDescriptionField(description, 'gameDescription'));
    dispatch(changeGameDescriptionField(minplayers, 'gameMinPlayers'));
    dispatch(changeGameDescriptionField(maxplayers, 'gameMaxPlayers'));
    dispatch(changeGameDescriptionField(idealplayers, 'gameIdealPlayers'));
    dispatch(changeGameDescriptionField(duration, 'gameDuration'));

    setModifygame(true);
    dispatch(showModal());
  };

  const cancelModifygame = () => {
    // Removes the datas saved
    dispatch(changeGameDescriptionField('', 'gameTitle'));
    dispatch(changeGameDescriptionField('', 'gameVisual'));
    dispatch(changeGameDescriptionField('', 'gameDescription'));
    dispatch(changeGameDescriptionField('', 'gameMinPlayers'));
    dispatch(changeGameDescriptionField('', 'gameMaxPlayers'));
    dispatch(changeGameDescriptionField('', 'gameIdealPlayers'));
    dispatch(changeGameDescriptionField('', 'gameDuration'));

    console.log('cancel modify game');
  };

  return (
    <Page>
      <div>
        <h2 className="boardgame-card_title">{title}</h2>
        <LazyLoadImage
          src={`${import.meta.env.VITE_BASE_URL}/images/${visual}`}
          alt={`Visual of ${title} game`}
        />
        <p className="boardgame-card_description">{description}</p>
        <p className="boardgame-card_maxplayers">
          Nombre de joueurs : {minplayers} - {maxplayers}
        </p>
        <p className="boardgame-card_idealplayers">
          Nombre de joueurs idéal : {idealplayers}
        </p>

        {isLogged && (
          <>
            <Button
              type="button"
              label="Supprimer la fiche de ce jeu"
              onClick={() => handleDeleteGame(id)}
            />

            <Button
              label="Modifier la fiche de ce jeu"
              type="button"
              onClick={handleModifygameForm}
            />
          </>
        )}

        <p>
          (Vous devez être l'auteur de cette page pour la supprimer ou la
          modifier)
        </p>
      </div>
      {deletedGame && <Navigate to="/user-space" replace />}

      {modifygame && isModalVisible && (
        <Modal closeModal={cancelModifygame}>
          <FormModifyGame
            gameTitle={gameTitleValue}
            gameDescription={gameDescriptionValue}
            gameMinPlayers={gameMinPlayersValue}
            gameMaxPlayers={gameMaxPlayersValue}
            gameIdealPlayers={gameIdealPlayersValue}
            gameDuration={gameDurationValue}
            currentGameTitle={title}
            currentGameDescription={description}
            currentGameMinPlayers={minplayers}
            currentGameMaxPlayers={maxplayers}
            currentGameIdealPlayers={idealplayers}
            currentGameDuration={duration}
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
            changeMinplayersField={(newValue, gameMinPlayersField) => {
              const action = changeGameMinPlayersField(
                newValue,
                gameMinPlayersField
              );
              dispatch(action);
            }}
            changeMaxplayersField={(newValue, gameMaxPlayersField) => {
              const action = changeGameMaxPlayersField(
                newValue,
                gameMaxPlayersField
              );
              dispatch(action);
            }}
            changeIdealPlayersField={(newValue, gameIdealPlayersField) => {
              const action = changeGameIdealPlayersField(
                newValue,
                gameIdealPlayersField
              );
              dispatch(action);
            }}
            changeDurationField={(newValue, gameDurationField) => {
              const action = changeGameDurationField(
                newValue,
                gameDurationField
              );
              dispatch(action);
            }}
          />
        </Modal>
      )}
    </Page>
  );
};

type Props = {
  [key: string]: {
    gameTitle: string;
    gameDescription: string;
    gameMinPlayers: string;
    gameMaxPlayers: string;
    gameIdealPlayers: string;
    gameDuration: string;
    gameVisual: string;
    list: Array<object>;
  };
};

export default GameSheet;
