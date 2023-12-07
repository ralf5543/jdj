import axios from 'axios';
import PropTypes from 'prop-types';
import Field from '../../genericComponents/Field/Field';
import './FormPostGame.scss';

const FormPostGame = ({
  changeTitleField,
  changeDescriptionField,
  changeMaxplayersField,
  changeIdealPlayersField,
  changeDurationField,
  handlePostGame,
  gameTitle,
  gameDescription,
  gameMaxPlayers,
  gameIdealPlayers,
  gameDuration,
}) => {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handlePostGame();
  };
  const handleFileUpload = (event) => {
    // get the selected file from the input
    const file = event.target.files[0];
    console.log('file selected : ', file);
    // create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append('file', file);
    // make a POST request to the File Upload API
    axios
      .post('http://localhost:3000/api/games/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        // handle the response
        console.log(response);
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  };

  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileUpload} name="image" />
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
