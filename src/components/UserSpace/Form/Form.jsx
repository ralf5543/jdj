import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Field from './Field/Field';
import './Form.scss';
import { fetchGames } from '../../../actions/games';

const Form = ({ changeField, handlePostGame, gameTitle }) => {
  const dispatch = useDispatch();
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handlePostGame();
    dispatch(fetchGames());
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
          name="gameTitle"
          type="text"
          placeholder="Titre du jeu"
          onChange={changeField}
          value={gameTitle}
        />
        <button type="submit" className="login-form-button">
          OK
        </button>
      </form>
    </div>
  );
};

Form.propTypes = {
  gameTitle: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handlePostGame: PropTypes.func.isRequired,
};

export default Form;
