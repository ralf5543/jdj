import Form from './Form/Form';
import './UserSpace.scss';

const UserSpace = () => {
  return (
    <>
      <p>furtur espace perso</p>
      <Form
        setInputValue={handleInputChange}
        inputValue={inputvalue}
        addNewGame={addNewGame}
      />
    </>
  );
};

export default UserSpace;
