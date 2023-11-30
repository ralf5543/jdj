import PropTypes from 'prop-types';
import Field from '../../genericComponents/Field/Field';
import './FormPostGame.scss';

const FormPostGame = ({
  changeTitleField,
  changeDescriptionField,
  changeMaxplayersField,
  changeIdealPlayersField,
  changeDurationField,
  changeVisualField,
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
    <div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Field
          // must have the same name of the state !!!!!!!!!!
          name="gameTitle"
          type="text"
          placeholder="Titre du jeu"
          onChange={changeTitleField}
          value={gameTitle}
        />
        <Field
          // must have the same name of the state !!!!!!!!!!
          name="gameDescription"
          type="text"
          placeholder="Description du jeu"
          onChange={changeDescriptionField}
          value={gameDescription}
        />
        <Field
          // must have the same name of the state !!!!!!!!!!
          name="gameMaxPlayers"
          type="number"
          placeholder="Nombre de joueurs maximum"
          onChange={changeMaxplayersField}
          value={gameMaxPlayers}
        />
        <Field
          // must have the same name of the state !!!!!!!!!!
          name="gameIdealPlayers"
          type="number"
          placeholder="Nombre de joueurs idéal"
          onChange={changeIdealPlayersField}
          value={gameIdealPlayers}
        />
        <Field
          // must have the same name of the state !!!!!!!!!!
          name="gameDuration"
          type="number"
          placeholder="Durée d'une partie"
          onChange={changeDurationField}
          value={gameDuration}
        />
        <Field
          // must have the same name of the state !!!!!!!!!!
          name="gameVisual"
          type="text"
          placeholder="Visuel du jeu"
          onChange={changeVisualField}
          value={gameVisual}
        />
        <button type="submit" className="login-form-button">
          OK
        </button>
      </form>
    </div>
  );
};

FormPostGame.propTypes = {
  gameTitle: PropTypes.string.isRequired,
  gameDescription: PropTypes.string.isRequired,
  gameMaxPlayers: PropTypes.number.isRequired,
  gameIdealPlayers: PropTypes.number.isRequired,
  gameDuration: PropTypes.number.isRequired,
  gameVisual: PropTypes.string.isRequired,
  changeTitleField: PropTypes.func.isRequired,
  changeDescriptionField: PropTypes.func.isRequired,
  changeMaxplayersField: PropTypes.func.isRequired,
  changeIdealPlayersField: PropTypes.func.isRequired,
  changeDurationField: PropTypes.func.isRequired,
  changeVisualField: PropTypes.func.isRequired,
  handlePostGame: PropTypes.func.isRequired,
};

export default FormPostGame;
