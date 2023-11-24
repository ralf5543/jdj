import PropTypes from 'prop-types';
import './Form.scss';

const Form = ({ inputValue, setInputValue, addNewGame }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addNewGame(inputValue);
      }}
    >
      <input
        value={inputValue}
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">submit</button>
    </form>
  );
};

Form.propTypes = {
  setInputValue: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  addNewGame: PropTypes.func.isRequired,
};

export default Form;
