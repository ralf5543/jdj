import { useSelector, useDispatch } from 'react-redux';
import Form from './Form/Form';
import { postGame, changeGameTitleField } from '../../actions/games';

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
      <p>furtur espace perso</p>
      <Form
        gameTitle={gameTitleValue}
        gameDescription={gameDescriptionValue}
        gameMaxPlayers={gameMaxPlayersValue}
        gameIdealPlayers={gameIdealPlayersValue}
        gameDuration={gameDurationValue}
        gameVisual={gameVisualValue}
        changeField={(newValue, gameTitleField) => {
          const action = changeGameTitleField(newValue, gameTitleField);
          dispatch(action);
          // console.log('newValue : ', newValue);
          // console.log('gameTitleField : ', gameTitleField);
          // console.log('gameTitleValue : ', gameTitleValue);
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
