/* eslint-disable react/no-unescaped-entities */
import { useSelector, useDispatch } from 'react-redux';
import FormPostGame from './FormPostGame/FormPostGame';
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

  const dispatch = useDispatch();

  const games = useSelector((state) => state.games.list);
  const currentUserGames = games.filter(
    (currentUserGame) => currentUserGame.userId === currentUserId
  );

  return (
    <Page>
      <h1>Espace perso de {nicknameValue}</h1>
      <h2>Mes jeux à moi que j'ai</h2>
      <GamesListing games={currentUserGames} />
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
    </Page>
  );
};

export default UserSpace;
