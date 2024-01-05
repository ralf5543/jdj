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
import Button from '../genericComponents/Button/Button';

const UserSpace = () => {
  const gameTitleValue = useSelector(
    (state: Props) => state.gamesReducer.gameTitle
  );
  const nicknameValue = useSelector((state: Props) => state.user.nickname);
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
  const gameVisualValue = useSelector(
    (state: Props) => state.gamesReducer.gameVisual
  );
  const currentUserId = useSelector((state: Props) => state.user.userId);
  const isModalVisible = useSelector(
    (state: Props) => state.layoutReducer.modalVisible
  );

  const dispatch = useDispatch();

  const games = useSelector((state: Props) => state.gamesReducer.list);
  const currentUserGames = games.filter(
    (currentUserGame) => currentUserGame.userId === currentUserId
  );

  const [postgame, setPostgame] = useState<'open' | 'closed'>('closed');

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
        <Button
          label="Recharger la liste"
          type="button"
          action={resetErrorBoundary}
        />
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

      <Button
        label="Ajouter un noveau un nouveau jeu"
        type="button"
        action={handlePostgameForm}
      />

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

type Props = {
  [key: string]: {
    gameTitle: string;
    nickname: string;
    gameDescription: string;
    gameMaxPlayers: string;
    gameIdealPlayers: string;
    gameDuration: string;
    gameVisual: string;
    userId: string;
    modalVisible: boolean;
    list: object[];
  };
  games: any;
};

export default UserSpace;
