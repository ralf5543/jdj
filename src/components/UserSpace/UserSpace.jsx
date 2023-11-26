import { useSelector, useDispatch } from 'react-redux';
import Form from './Form/Form';
import { postGame, changeTestField } from '../../actions/games';
import './UserSpace.scss';

const UserSpace = () => {
  const testValue = useSelector((state) => state.games.test);

  const dispatch = useDispatch();
  return (
    <>
      <p>furtur espace perso</p>
      <Form
        test={testValue}
        changeField={(newValue, testfield) => {
          const action = changeTestField(newValue, testfield);
          dispatch(action);
          console.log('newValue : ', newValue);
          console.log('testfield : ', testfield);
          console.log('testValue : ', testValue);
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
