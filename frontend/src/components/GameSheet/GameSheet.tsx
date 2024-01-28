/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './GameSheet.scss';
import { Navigate, useParams } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from '../../utils/axios';
import Page from '../genericComponents/Page/Page';
import Button from '../genericComponents/Button/Button';
import {
  showModal,
  showToaster,
  showLoader,
  hideLoader,
} from '../../actions/layout';
import { modifyProfile, fetchUsers } from '../../actions/user';

import {
  deleteGame,
  changeGameTitleField,
  changeGameDescriptionField,
  changeGameMinPlayersField,
  changeGameMaxPlayersField,
  changeGameIdealPlayersField,
  changeGameDurationField,
  changeCurrentGameId,
  changeGameConfrontationField,
  uploadGameVisual,
} from '../../actions/games';

import FormModifyGame from '../UserSpace/FormModifyGame/FormModifyGame';
import Modal from '../genericComponents/Modal/Modal';

const GameSheet = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const games = useSelector((state: Props) => state.gamesReducer.list);

  const [deletedGame, setDeletedGame] = useState<boolean>(false);

  // find the first element with the id matching the slug
  const currentGame = games.find((element) => element._id === id);

  const {
    title,
    visual,
    description,
    minplayers,
    maxplayers,
    idealplayers,
    duration,
    confrontation,
    _id,
    userId,
  } = currentGame;

  // changes the current game ID in the store
  useEffect(() => {
    dispatch(changeCurrentGameId(id));
  }, [dispatch, id]);

  const handleDeleteGame = (gameId: string | undefined) => {
    dispatch(deleteGame());

    // Route => home
    setDeletedGame(true);
  };

  const currentUserId = useSelector((state: Props) => state.user.userId);
  const currentUserToken = useSelector((state: Props) => state.user.token);
  const currentUserOwnedGames = useSelector(
    (state: Props) => state.user.ownedGames
  );
  const isLogged = useSelector((state: Props) => state.user.logged);

  const gameTitleValue = useSelector(
    (state: Props) => state.gamesReducer.gameTitle
  );
  const gameDescriptionValue = useSelector(
    (state: Props) => state.gamesReducer.gameDescription
  );
  const gameMinPlayersValue = useSelector(
    (state: Props) => state.gamesReducer.gameMinPlayers
  );
  const gameMaxPlayersValue = useSelector(
    (state: Props) => state.gamesReducer.gameMaxPlayers
  );
  const gameIdealPlayersValue = useSelector(
    (state: Props) => state.gamesReducer.gameIdealPlayers
  );
  const gameDurationValue = useSelector(
    (state: Props) => state.gamesReducer.gameDuration
  );
  const gameConfrontationValue = useSelector(
    (state: Props) => state.gamesReducer.gameConfrontation
  );

  // ======================------------------- MODIFY GAME
  const [modifygame, setModifygame] = useState<boolean>(false);

  const isModalVisible = useSelector(
    (state: Props) => state.layoutReducer.modalVisible
  );

  const handleModifygameForm = () => {
    // Retrieves all games datas in the store, so the user doesn't have to rewrite infos
    dispatch(changeGameDescriptionField(title, 'gameTitle'));
    dispatch(uploadGameVisual(visual, 'gameVisual'));
    dispatch(changeGameDescriptionField(description, 'gameDescription'));
    dispatch(changeGameMinPlayersField(minplayers, 'gameMinPlayers'));
    dispatch(changeGameMaxPlayersField(maxplayers, 'gameMaxPlayers'));
    dispatch(changeGameIdealPlayersField(idealplayers, 'gameIdealPlayers'));
    dispatch(changeGameDurationField(duration, 'gameDuration'));
    dispatch(changeGameConfrontationField(confrontation, 'gameConfrontation'));

    setModifygame(true);
    dispatch(showModal());
  };

  const cancelModifygame = () => {
    // Removes the datas saved
    dispatch(changeGameDescriptionField('', 'gameTitle'));
    dispatch(changeGameDescriptionField('', 'gameVisual'));
    dispatch(changeGameDescriptionField('', 'gameDescription'));
    dispatch(changeGameDescriptionField('', 'gameMinPlayers'));
    dispatch(changeGameDescriptionField('', 'gameMaxPlayers'));
    dispatch(changeGameDescriptionField('', 'gameIdealPlayers'));
    dispatch(changeGameDescriptionField('', 'gameDuration'));
    dispatch(changeGameConfrontationField('', 'gameConfrontation'));

    console.log('cancel modify game');
  };

  const allUsers = useSelector((state: Props) => state.user.users);
  const gameOwners = allUsers.filter((user) => user.ownedGames.includes(id));
  const OwnsTheGame = currentUserOwnedGames.some((item) => item === _id);

  const updatedGamesList = (newValue) => {
    dispatch(showLoader());
    axios
      .put(
        // URL
        `/api/auth/${currentUserId}`,
        // paramètres
        {
          ownedGames: newValue,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUserToken}`,
          },
        }
      )
      .then(() => {
        dispatch(modifyProfile(newValue));
        dispatch(fetchUsers());
        dispatch(
          showToaster('success', 'Votre liste de jeux a été mise à jour !')
        );
      })
      .catch((error) => {
        console.log('erreur de la requete : ', error);
        dispatch(showToaster('error', "Une erreur s'est produite"));
      })
      .finally(() => {
        dispatch(hideLoader());
      });
  };

  return (
    <Page>
      <article className="gamesheet">
        <h1 className="gamesheet_title">{title}</h1>

        {gameOwners.length > 0 ? (
          <p className="gamesheet_owners">
            Détenu par
            <span className="gamesheet_owners_amount">
              {gameOwners.length}{' '}
              {`Joueur${gameOwners.length > 1 ? 's' : ''} du Jeudi`}
            </span>{' '}
            ({gameOwners.map((owner: any) => owner.nickname).join(', ')})
          </p>
        ) : (
          <p className="gamesheet_owners_none">
            Plus aucun Joueur du Jeudi ne possède ce jeu !
          </p>
        )}

        <div className="gamesheet_inner">
          <div className="gamesheet_content">
            <LazyLoadImage
              className="gamesheet_visual"
              src={`${import.meta.env.VITE_BASE_URL}/images/${visual}`}
              alt={`Visual of ${title} game`}
            />

            <p className="gamesheet_description">{description}</p>
          </div>
          <aside className="gamesheet_infos">
            <h2 className="gamesheet_infos_title">En vrac...</h2>
            <ul className="gamesheet_resume">
              <li>Type : {confrontation}</li>
              <li>
                Nombre de joueurs : {minplayers} - {maxplayers}
              </li>
              <li>Nombre de joueurs idéal : {idealplayers}</li>
            </ul>
          </aside>
        </div>

        {isLogged && (
          <div className="gamesheet_actions">
            {' '}
            {OwnsTheGame ? (
              <Button
                type="button"
                label="Retirer ce jeu de ma liste"
                onClick={() =>
                  updatedGamesList(
                    currentUserOwnedGames.filter((item) => item !== _id)
                  )
                }
              />
            ) : (
              <Button
                type="button"
                label="Ajouter ce jeu à ma liste!"
                onClick={() =>
                  updatedGamesList([...currentUserOwnedGames, _id])
                }
              />
            )}
            {currentUserId === userId && (
              <>
                <Button
                  type="button"
                  label="Supprimer la fiche de ce jeu"
                  onClick={() => handleDeleteGame(id)}
                />

                <Button
                  label="Modifier la fiche de ce jeu"
                  type="button"
                  onClick={handleModifygameForm}
                />
              </>
            )}
          </div>
        )}

        <p className="text-secondary">
          (Vous devez être l'auteur de cette page pour la supprimer ou la
          modifier)
        </p>
      </article>
      {deletedGame && <Navigate to="/user-space" replace />}

      {modifygame && isModalVisible && (
        <Modal closeModal={cancelModifygame}>
          <FormModifyGame
            gameTitle={gameTitleValue}
            gameDescription={gameDescriptionValue}
            gameMinPlayers={gameMinPlayersValue}
            gameMaxPlayers={gameMaxPlayersValue}
            gameIdealPlayers={gameIdealPlayersValue}
            gameDuration={gameDurationValue}
            gameConfrontation={gameConfrontationValue}
            currentGameTitle={title}
            currentGameDescription={description}
            currentGameMinPlayers={minplayers}
            currentGameMaxPlayers={maxplayers}
            currentGameIdealPlayers={idealplayers}
            currentGameDuration={duration}
            currentGameConfrontation={confrontation}
            currentGameVisual={visual}
            changeTitleField={(newValue, gameTitleField) => {
              const action = changeGameTitleField(newValue, gameTitleField);
              dispatch(action);
            }}
            changeDescriptionField={(newValue, gameDescriptionField) => {
              const action = changeGameDescriptionField(
                newValue,
                gameDescriptionField
              );
              dispatch(action);
            }}
            changeMinplayersField={(newValue, gameMinPlayersField) => {
              const action = changeGameMinPlayersField(
                newValue,
                gameMinPlayersField
              );
              dispatch(action);
            }}
            changeMaxplayersField={(newValue, gameMaxPlayersField) => {
              const action = changeGameMaxPlayersField(
                newValue,
                gameMaxPlayersField
              );
              dispatch(action);
            }}
            changeIdealPlayersField={(newValue, gameIdealPlayersField) => {
              const action = changeGameIdealPlayersField(
                newValue,
                gameIdealPlayersField
              );
              dispatch(action);
            }}
            changeDurationField={(newValue, gameDurationField) => {
              const action = changeGameDurationField(
                newValue,
                gameDurationField
              );
              dispatch(action);
            }}
            changeConfrontationField={(newValue, gameConfrontationField) => {
              const action = changeGameConfrontationField(
                newValue,
                gameConfrontationField
              );
              dispatch(action);
            }}
          />
        </Modal>
      )}
    </Page>
  );
};

type Props = {
  [key: string]: {
    gameTitle: string;
    gameDescription: string;
    gameMinPlayers: string;
    gameMaxPlayers: string;
    gameIdealPlayers: string;
    gameDuration: string;
    gameconfrontation: string;
    gameOwners: Array<string>;
    gameVisual: string;
    list: Array<object>;
  };
};

export default GameSheet;
