import PropTypes from 'prop-types';
import Field from './Field/Field';
import './Form.scss';

const Form = ({
  changeField,
  handlePostGame,
  gameTitle,
  gameDescription,
  gameMaxPlayers,
  gameIdealPlayers,
  gameDuration,
  gameVisual,
}) => {
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
          name="gameTitle"
          type="text"
          placeholder="Titre du jeu"
          onChange={changeField}
          value={gameTitle}
        />
        <Field
          // must have the same name of the state !!!!!!!!!!
          name="gameDescription"
          type="text"
          placeholder="Description du jeu"
          onChange={changeField}
          value={gameDescription}
        />
        <Field
          // must have the same name of the state !!!!!!!!!!
          name="gameMaxPlayers"
          type="number"
          placeholder="Nombre de joueurs maximum"
          onChange={changeField}
          value={gameMaxPlayers}
        />
        <Field
          // must have the same name of the state !!!!!!!!!!
          name="gameIdealPlayers"
          type="number"
          placeholder="Nombre de joueurs idéal"
          onChange={changeField}
          value={gameIdealPlayers}
        />
        <Field
          // must have the same name of the state !!!!!!!!!!
          name="gameDuration"
          type="number"
          placeholder="Durée d'une partie"
          onChange={changeField}
          value={gameDuration}
        />
        <Field
          // must have the same name of the state !!!!!!!!!!
          name="gameVisual"
          type="image"
          placeholder="Visuel du jeu"
          onChange={changeField}
          value={gameVisual}
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
  gameDescription: PropTypes.string.isRequired,
  gameMaxPlayers: PropTypes.number.isRequired,
  gameIdealPlayers: PropTypes.number.isRequired,
  gameDuration: PropTypes.number.isRequired,
  gameVisual: PropTypes.string.isRequired,
  changeField: PropTypes.func.isRequired,
  handlePostGame: PropTypes.func.isRequired,
};

export default Form;
