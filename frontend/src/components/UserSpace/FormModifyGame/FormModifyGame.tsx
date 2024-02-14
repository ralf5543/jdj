/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Field from '../../genericComponents/Form/Field/Field';
import './FormModifyGame.scss';
import { uploadGameVisual, modifyGame } from '../../../actions/games';
import Textarea from '../../genericComponents/Form/Textarea/Textarea';
import Radio from '../../genericComponents/Form/Radio/Radio';
import Button from '../../genericComponents/Button/Button';
import store from '../../../store';

const FormModifyGame = ({
  currentGameTitle,
  currentGameDescription,
  currentGameMinPlayers,
  currentGameMaxPlayers,
  currentGameIdealPlayers,
  currentGameDuration,
  currentGameVisual,
  changeTitleField,
  changeDescriptionField,
  changeMinplayersField,
  changeMaxplayersField,
  changeIdealPlayersField,
  changeDurationField,
  changeConfrontationField,
  gameTitle,
  gameDescription,
  gameMinPlayers,
  gameMaxPlayers,
  gameIdealPlayers,
  gameDuration,
  gameConfrontation,
}: Props) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState<File>();
  const [filename, setFilename] = useState<string>('Choose File');
  const [fileChosen, setFileChosen] = useState<boolean>(false);
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    dispatch(modifyGame());
  };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setFile(e.target.files[0]);
      setFilename(e.target.files[0].name);
      setFileChosen(true);
    }
  };

  const [dynamicvalue, setDynamicvalue] = useState(currentGameVisual);

  console.log('gameDescription : ', currentGameDescription);

  const handleSubmitImage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('file selected : ', file);
    // create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append('file', file);
    // formData.set('file', file);
    // make a POST request to the File Upload API
    axios
      .post(`${import.meta.env.VITE_BASE_URL}/images`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        // handle the response
        console.log('Image uploaded : ', response.data.status);
        // setUploadedFilename(response.data.status);
        const action = uploadGameVisual(response.data);
        dispatch(action);
        setIsFileUploaded(true);
        setDynamicvalue(response.data.status);
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      });
  };

  console.log('currentGameVisual : ', currentGameVisual);
  console.log(
    'store.getState().gamesReducer.gameVisual : ',
    store.getState().gamesReducer.gameVisual
  );

  return (
    <>
      <h2>Modifier la fiche du jeu</h2>
      {!isFileUploaded && (
        <form autoComplete="off" onSubmit={handleSubmitImage}>
          <div className="field">
            {fileChosen ? (
              <Button label={`Publier l'image : ${filename}`} type="submit">
                <i className="fa-solid fa-file-arrow-up" />
              </Button>
            ) : (
              <>
                <input
                  type="file"
                  id="uploadfile"
                  onChange={handleFileUpload}
                  name="image"
                />
                <label htmlFor="uploadfile">
                  <i className="fa-solid fa-file-arrow-up" />
                  Choisir une nouvelle image sur votre ordinateur
                </label>
              </>
            )}
          </div>
        </form>
      )}

      <LazyLoadImage
        className="postgame_img-preview"
        /* src={`${import.meta.env.VITE_BASE_URL}/images/${
          store.getState().gamesReducer.gameVisual
        }`} */
        src={`${import.meta.env.VITE_BASE_URL}/images/${dynamicvalue}`}
        alt="image uploaded"
      />

      <form autoComplete="off" onSubmit={handleSubmit}>
        <Field
          // must have the same name of the state !!!!!!!!!!
          name="gameTitle"
          type="text"
          placeholder="Titre du jeu"
          onChange={changeTitleField}
          value={gameTitle}
          defaultInputValue={currentGameTitle}
        />
        <Textarea
          // must have the same name of the state !!!!!!!!!!
          name="gameDescription"
          placeholder="Description du jeu"
          onChange={changeDescriptionField}
          value={gameDescription}
          defaultInputValue={currentGameDescription}
        />
        <Field
          // must have the same name of the state !!!!!!!!!!
          name="gameMinPlayers"
          type="number"
          placeholder="Nombre de joueurs minimum"
          onChange={changeMinplayersField}
          value={gameMinPlayers}
          defaultInputValue={currentGameMinPlayers}
        />
        <Field
          // must have the same name of the state !!!!!!!!!!
          name="gameMaxPlayers"
          type="number"
          placeholder="Nombre de joueurs maximum"
          onChange={changeMaxplayersField}
          value={gameMaxPlayers}
          defaultInputValue={currentGameMaxPlayers}
        />
        <Field
          // must have the same name of the state !!!!!!!!!!
          name="gameIdealPlayers"
          type="number"
          placeholder="Nombre de joueurs idéal"
          onChange={changeIdealPlayersField}
          value={gameIdealPlayers}
          defaultInputValue={currentGameIdealPlayers}
        />
        <Field
          // must have the same name of the state !!!!!!!!!!
          name="gameDuration"
          type="number"
          placeholder="Durée d'une partie"
          onChange={changeDurationField}
          value={gameDuration}
          defaultInputValue={currentGameDuration}
        />
        <p> Type de jeu :</p>
        <div className="fields_columns">
          <Radio
            name="gameConfrontation"
            id="Confrontation"
            placeholder="Confrontation"
            onChange={changeConfrontationField}
            value={gameConfrontation}
          />
          <Radio
            name="gameConfrontation"
            id="Coopération"
            placeholder="Coopération"
            onChange={changeConfrontationField}
            value={gameConfrontation}
          />
          <Radio
            name="gameConfrontation"
            id="Semi-coopération"
            placeholder="Semi-coopération"
            onChange={changeConfrontationField}
            value={gameConfrontation}
          />
        </div>
        <Button label="Valider les changements" type="submit" />
      </form>
    </>
  );
};

type Props = {
  gameTitle: string;
  gameDescription: string;
  gameMinPlayers: string;
  gameMaxPlayers: string;
  gameIdealPlayers: string;
  gameDuration: string;
  gameConfrontation: string;
  changeTitleField: (ChangeEvent: React.ChangeEvent<HTMLElement>) => void;
  changeDescriptionField: (arg0: string, arg1: string) => void;
  changeMinplayersField: (ChangeEvent: React.ChangeEvent<HTMLElement>) => void;
  changeMaxplayersField: (ChangeEvent: React.ChangeEvent<HTMLElement>) => void;
  changeIdealPlayersField: (
    ChangeEvent: React.ChangeEvent<HTMLElement>
  ) => void;
  changeDurationField: (ChangeEvent: React.ChangeEvent<HTMLElement>) => void;
  changeConfrontationField: (
    ChangeEvent: React.ChangeEvent<HTMLElement>
  ) => void;
};

export default FormModifyGame;
