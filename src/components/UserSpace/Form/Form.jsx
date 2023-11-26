import PropTypes from 'prop-types';
import Field from './Field/Field';
import './Form.scss';

const Form = ({ changeField, handlePostGame, test }) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handlePostGame();
  };

  return (
    <div className="login-form">
      <form
        autoComplete="off"
        className="login-form-element"
        onSubmit={handleSubmit}
      >
        <Field
          // must have the same name of the state !!!!!!!!!!
          name="test"
          type="text"
          placeholder="test"
          onChange={changeField}
          value={test}
        />
        <button type="submit" className="login-form-button">
          OK
        </button>
      </form>
    </div>
  );
};

Form.propTypes = {
  test: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handlePostGame: PropTypes.func.isRequired,
};

export default Form;
