import { useSelector, useDispatch } from 'react-redux';
import Form from './Form/Form';
import {
  postGame,
  updateGamesList,
  changeGameTitleField,
} from '../../actions/games';
import './UserSpace.scss';

const UserSpace = () => {
  const gameTitleValue = useSelector((state) => state.games.gameTitle);

  const dispatch = useDispatch();
  return (
    <>
      <p>furtur espace perso</p>
      <Form
        gameTitle={gameTitleValue}
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
          const action = postGame();
          dispatch(action);
        }}
        updateGamesList={() => {
          dispatch(updateGamesList());
        }}
      />
    </>
  );
};

export default UserSpace;
