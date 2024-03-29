/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { Navigate } from 'react-router-dom';
import { fetchUsers } from '../../actions/user';
import FormPostGame from './FormPostGame/FormPostGame';
import { showModal } from '../../actions/layout';
import {
  postGame,
  changeGameTitleField,
  changeGameDescriptionField,
  changeGameMinPlayersField,
  changeGameMaxPlayersField,
  changeGameIdealPlayersField,
  changeGameDurationField,
  changeGameConfrontationField,
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
  const gameVisualValue = useSelector(
    (state: Props) => state.gamesReducer.gameVisual
  );

  const isModalVisible = useSelector(
    (state: Props) => state.layoutReducer.modalVisible
  );
  const ownedGamesById = useSelector((state: Props) => state.user.ownedGames);

  const dispatch = useDispatch();

  useEffect(() => {
    const action = fetchUsers();
    dispatch(action);
  }, [dispatch]);
  const games = useSelector((state: Props) => state.gamesReducer.list);

  const ownedGamesList = games.filter((game) => ownedGamesById.includes(game._id));

  const [postgame, setPostgame] = useState<boolean>(false);

  const handlePostgameForm = () => {
    setPostgame(true);
    dispatch(showModal());
  };

  const cancelPostgame = () => {
    console.log('cancel post game');
  };

  const isLogged = useSelector((state: Props) => state.user.logged);

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
          onClick={resetErrorBoundary}
        />
      </div>
    );
  }

  return (
    <Page>
      {/* Redirect to home page if not log out */}
      {!isLogged && <Navigate to="/" replace />}

      <h1>Espace perso de {nicknameValue}</h1>
      <h2>Mes jeux à moi que j'ai</h2>

      <Button
        label="Ajouter un nouveau jeu"
        type="button"
        onClick={handlePostgameForm}
      />

      <ErrorBoundary
        fallbackRender={fallbackRender}
        onReset={(details) => {
          // Reset the state of your app so the error doesn't happen again
          console.log('details : ', details);
        }}
      >
        <GamesListing games={ownedGamesList} />
      </ErrorBoundary>

      {postgame && isModalVisible && (
        <Modal closeModal={cancelPostgame}>
          <FormPostGame
            gameTitle={gameTitleValue}
            gameDescription={gameDescriptionValue}
            gameMinPlayers={gameMinPlayersValue}
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
            changeConfrontationField={(newValue, gameConfrontationField) => {
              const action = changeGameConfrontationField(
                newValue,
                gameConfrontationField
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
    gameMinPlayers: string;
    gameMaxPlayers: string;
    gameIdealPlayers: string;
    gameDuration: string;
    gameVisual: string;
    gameConfrontation: string;
    userId: string;
    modalVisible: boolean;
    list: object[];
  };
  games: any;
};

export default UserSpace;
