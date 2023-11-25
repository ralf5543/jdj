import { useSelector, useDispatch } from 'react-redux';
import Form from './Form/Form';
import { postGame, changeTestField } from '../../actions/games';
import './UserSpace.scss';

const UserSpace = () => {
  const testValue = useSelector((state) => state.games.test);

  // console.log(emailValue);

  const dispatch = useDispatch();
  return (
    <>
      <p>furtur espace perso</p>
      <Form
        test={testValue}
        changeField={(newValue, identifier) => {
          const action = changeTestField(newValue, identifier);
          dispatch(action);
        }}
        handlePostGame={() => {
          // le traitement placé ici est déclenché à la soumission du formulaire
          // console.log('handlePostGame');
          const action = postGame();
          dispatch(action);
        }}
      />
    </>
  );
};

export default UserSpace;
