/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import store from '../../../store';
import Field from '../../genericComponents/Form/Field/Field';
import './FormPostGame.scss';
import { uploadGameVisual } from '../../../actions/games';
import { hideLoader, showLoader } from '../../../actions/layout';
import Textarea from '../../genericComponents/Form/Textarea/Textarea';
import Button from '../../genericComponents/Button/Button';
import Radio from '../../genericComponents/Form/Radio/Radio';

const FormPostGame = ({
  changeTitleField,
  changeDescriptionField,
  changeMinplayersField,
  changeMaxplayersField,
  changeIdealPlayersField,
  changeDurationField,
  changeConfrontationField,
  handlePostGame,
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handlePostGame();
  };
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null) {
      setFile(e.target.files[0]);
      setFilename(e.target.files[0].name);
      setFileChosen(true);
    }
  };

  const handleSubmitImage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('file selected : ', file);
    // create a new FormData object and append the file to it
    const formData = new FormData();
    formData.append('file', file);
    // formData.set('file', file);
    // make a POST request to the File Upload API
    store.dispatch(showLoader());

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
      })
      .catch((error) => {
        // handle errors
        console.log(error);
      })
      .finally(() => {
        store.dispatch(hideLoader());
      });
  };

  return (
    <>
      <h2>Ajouter un jeu à votre liste</h2>

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
                  Choisir une image sur votre ordinateur
                </label>
              </>
            )}
          </div>
        </form>
      )}

      {isFileUploaded && (
        <LazyLoadImage
          className="postgame_img-preview"
          src={`${import.meta.env.VITE_BASE_URL}/images/${
            store.getState().gamesReducer.gameVisual
          }`}
          alt="image uploaded"
        />
      )}

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
          name="gameMinPlayers"
          type="number"
          placeholder="Nombre de joueurs minimum"
          onChange={changeMinplayersField}
          value={gameMinPlayers}
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

        <Button type="submit" label="Poster la fiche" />
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
  handlePostGame: () => void;
};

export default FormPostGame;
