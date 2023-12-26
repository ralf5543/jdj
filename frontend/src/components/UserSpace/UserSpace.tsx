/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import FormPostGame from './FormPostGame/FormPostGame';
import { showModal } from '../../actions/layout';
import {
  postGame,
  changeGameTitleField,
  changeGameDescriptionField,
  changeGameMaxPlayersField,
  changeGameIdealPlayersField,
  changeGameDurationField,
} from '../../actions/games';

import './UserSpace.scss';
import Page from '../genericComponents/Page/Page';
import GamesListing from '../GamesListing/GamesListing';
import Modal from '../genericComponents/Modal/Modal';

const UserSpace = () => {
  const gameTitleValue = useSelector((state) => state.games.gameTitle);
  const nicknameValue = useSelector((state) => state.user.nickname);
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
  const currentUserId = useSelector((state) => state.user.userId);
  const isModalVisible = useSelector((state) => state.layout.modalVisible);

  const dispatch = useDispatch();

  const games = useSelector((state) => state.games.list);
  const currentUserGames = games.filter(
    (currentUserGame) => currentUserGame.userId === currentUserId
  );

  const [postgame, setPostgame] = useState('closed');

  const handlePostgameForm = () => {
    setPostgame('open');
    dispatch(showModal());
  };

  const cancelPostgame = () => {
    console.log('cancel post game');
  };

  function fallbackRender({ error, resetErrorBoundary }) {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.

    return (
      <div role="alert">
        <h2>Impossible de charger la liste de jeux :</h2>
        <pre style={{ color: 'red' }}>{error.message}</pre>
        <p>Merci de nous signaler cette erreur.</p>
        <button className="link" type="button" onClick={resetErrorBoundary}>
          Recharger la liste
        </button>
      </div>
    );
  }

  return (
    <Page>
      <h1>Espace perso de {nicknameValue}</h1>
      <h2>Mes jeux à moi que j'ai</h2>

      <ErrorBoundary
        fallbackRender={fallbackRender}
        onReset={(details) => {
          // Reset the state of your app so the error doesn't happen again
          console.log('details : ', details);
        }}
      >
        <GamesListing games={currentUserGames} />
      </ErrorBoundary>

      <button className="link" type="button" onClick={handlePostgameForm}>
        Ajoutez un noveau un nouveau jeu à votre liste !
      </button>
      {postgame && isModalVisible && (
        <Modal closeModal={cancelPostgame}>
          <FormPostGame
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
            handlePostGame={() => {
              // le traitement placé ici est déclenché à la soumission du formulaire
              dispatch(postGame());
            }}
          />
        </Modal>
      )}
    </Page>
  );
};

export default UserSpace;
