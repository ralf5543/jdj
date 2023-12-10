/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unescaped-entities */
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import './GameSheet.scss';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Page from '../genericComponents/Page/Page';
import { findGame } from '../../../selectors/games';

const GameSheet = () => {
  const { id } = useParams();

  const games = useSelector((state) => state.games.list);

  // find the first element with the id matching the slug
  const currentGame = games.find((element) => element._id === id);

  return (
    <Page>
      <div>
        <p>Vous êtes sur l'article possédant le slug {id}</p>
        <h2 className="boardgame-card_title">{currentGame.title}</h2>
        <img src={currentGame.visual} alt="" />
        <p className="boardgame-card_description">{currentGame.description}</p>
        <p className="boardgame-card_maxplayers">
          Nombre de joueurs MAX : {currentGame.maxplayers}
        </p>
        <p className="boardgame-card_idealplayers">
          Nombre de joueurs idéal : {currentGame.idealplayers}
        </p>
      </div>
    </Page>
  );
};

export default GameSheet;
