/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unescaped-entities */
import axios from 'axios';
import { useSelector } from 'react-redux';
import './GameSheet.scss';
import { useParams } from 'react-router-dom';
import Page from '../genericComponents/Page/Page';

const GameSheet = () => {
  const { id } = useParams();

  const games = useSelector((state) => state.games.list);

  // find the first element with the id matching the slug
  const currentGame = games.find((element) => element._id === id);
  const { title, visual, description, maxplayers, idealplayers } = currentGame;

  return (
    <Page>
      <div>
        <h2 className="boardgame-card_title">{title}</h2>
        <img src={visual} alt="" />
        <p className="boardgame-card_description">{description}</p>
        <p className="boardgame-card_maxplayers">
          Nombre de joueurs MAX : {maxplayers}
        </p>
        <p className="boardgame-card_idealplayers">
          Nombre de joueurs idéal : {idealplayers}
        </p>
      </div>
    </Page>
  );
};

export default GameSheet;
