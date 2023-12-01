import { useSelector, useDispatch } from 'react-redux';
import Form from './FormPostGame/FormPostGame';
import {
  postGame,
  changeGameTitleField,
  changeGameDescriptionField,
  changeGameMaxPlayersField,
  changeGameIdealPlayersField,
  changeGameDurationField,
  changeGameVisualField,
} from '../../actions/games';

import './UserSpace.scss';

const UserSpace = () => {
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

  const dispatch = useDispatch();
  return (
    <>
      <h1>futur espace perso</h1>
      <Form
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
        changeVisualField={(newValue, gameVisualField) => {
          const action = changeGameVisualField(newValue, gameVisualField);
          dispatch(action);
        }}
        handlePostGame={() => {
          // le traitement placé ici est déclenché à la soumission du formulaire
          // console.log('handlePostGame');
          dispatch(postGame());
        }}
      />
    </>
  );
};

export default UserSpace;
