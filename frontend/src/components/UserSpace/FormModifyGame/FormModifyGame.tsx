/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import store from '../../../store';
import Field from '../../genericComponents/Field/Field';
import './FormModifyGame.scss';
import { changeGameVisual, modifyGame } from '../../../actions/games';
import Textarea from '../../genericComponents/Textarea/Textarea';

const FormModifyGame = ({
  changeTitleField,
  changeDescriptionField,
  changeMaxplayersField,
  changeIdealPlayersField,
  changeDurationField,
  gameTitle,
  gameDescription,
  gameMaxPlayers,
  gameIdealPlayers,
  gameDuration,
}: Props) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState<string>('');
  const [filename, setFilename] = useState('Choose File');
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(modifyGame());
  };
  const handleFileUpload = (e: React.SyntheticEvent) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const handleSubmitImage = (e: React.SyntheticEvent) => {
    e.preventDefault();
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
    <section>
      <h2>Modifier la fiche du jeu</h2>
      <form autoComplete="off" onSubmit={handleSubmitImage}>
        <input type="file" onChange={handleFileUpload} name="image" />
        {isFileUploaded && (
          <img
            src={`http://localhost:3000/images/${
              store.getState().gamesReducer.gameVisual
            }`}
            alt=""
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
    </section>
  );
};

type Props = {
  gameTitle: string;
  gameDescription: string;
  gameMaxPlayers: string;
  gameIdealPlayers: string;
  gameDuration: string;
  changeTitleField: (ChangeEvent: React.ChangeEvent<HTMLElement>) => void;
  changeDescriptionField: (arg0: string, arg1: string) => void;
  changeMaxplayersField: (ChangeEvent: React.ChangeEvent<HTMLElement>) => void;
  changeIdealPlayersField: (
    ChangeEvent: React.ChangeEvent<HTMLElement>
  ) => void;
  changeDurationField: (ChangeEvent: React.ChangeEvent<HTMLElement>) => void;
};

export default FormModifyGame;
