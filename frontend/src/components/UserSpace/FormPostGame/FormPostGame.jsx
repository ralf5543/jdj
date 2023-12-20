/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import store from '../../../store';
import Field from '../../genericComponents/Field/Field';
import './FormPostGame.scss';
import { changeGameVisual } from '../../../actions/games';
import Textarea from '../../genericComponents/Textarea/Textarea';

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
  const dispatch = useDispatch();
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [isFileUploaded, setIsFileUploaded] = useState(false);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handlePostGame();
  };
  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const handleSubmitImage = (evt) => {
    evt.preventDefault();
    console.log('file selected : ', file);
    // create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append('file', file);
    // formData.set('file', file);
    // make a POST request to the File Upload API
    axios
      .post('http://localhost:3000/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        // handle the response
        console.log('Image uploaded : ', response.data.status);
        // setUploadedFilename(response.data.status);
        const action = changeGameVisual(response.data);
        dispatch(action);
        setIsFileUploaded(true);
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  };

  return (
    <>
      <h2>Ajouter un jeu à votre liste</h2>
      <form autoComplete="off" onSubmit={handleSubmitImage}>
        <input type="file" onChange={handleFileUpload} name="image" />
        {isFileUploaded && (
          <LazyLoadImage
            className="postgame_img-preview"
            src={`http://localhost:3000/images/${
              store.getState().games.gameVisual
            }`}
            alt="image to upload"
          />
        )}
        <button type="submit">Charger l'image</button>
      </form>

      <form autoComplete="off" onSubmit={handleSubmit}>
        <Field
          // must have the same name of the state !!!!!!!!!!
          name="gameTitle"
          type="text"
          placeholder="Titre du jeu"
          onChange={changeTitleField}
          value={gameTitle}
        />
        <Textarea
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
    </>
  );
};

FormPostGame.propTypes = {
  gameTitle: PropTypes.string.isRequired,
  gameDescription: PropTypes.string.isRequired,
  gameMaxPlayers: PropTypes.number.isRequired,
  gameIdealPlayers: PropTypes.number.isRequired,
  gameDuration: PropTypes.number.isRequired,
  changeTitleField: PropTypes.func.isRequired,
  changeDescriptionField: PropTypes.func.isRequired,
  changeMaxplayersField: PropTypes.func.isRequired,
  changeIdealPlayersField: PropTypes.func.isRequired,
  changeDurationField: PropTypes.func.isRequired,
  handlePostGame: PropTypes.func.isRequired,
};

export default FormPostGame;
