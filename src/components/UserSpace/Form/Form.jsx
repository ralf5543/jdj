import PropTypes from 'prop-types';
import './Form.scss';

const Form = ({ inputValue, setInputValue, addNewPost }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addNewPost(inputValue);
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
  addNewPost: PropTypes.func.isRequired,
};

export default Form;
