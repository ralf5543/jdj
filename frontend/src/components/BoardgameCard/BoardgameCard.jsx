import './BoardgameCard.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BoardgameCard = ({
  description,
  title,
  maxplayers,
  idealplayers,
  duration,
  visual,
  id,
}) => {
  return (
    <li className="boardgame-card">
      <picture className="boardgame-card_visual_wrapper">
        <img className="boardgame-card_visual" src={visual} alt="" />
      </picture>
      <div className="boardgame-card_content">
        <p className="boardgame-card_title">{title}</p>
        <p className="boardgame-card_description">{description}</p>
        <p className="boardgame-card_maxplayers">
          Nombre de joueurs MAX : {maxplayers}
        </p>
        <p className="boardgame-card_idealplayers">
          Nombre de joueurs idéal : {idealplayers}
        </p>
        <p className="boardgame-card_duration">{duration} minutes</p>
        <Link to={`/game/${id}`}>Fiche complète du jeu</Link>
      </div>
    </li>
  );
};

BoardgameCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  maxplayers: PropTypes.number.isRequired,
  idealplayers: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  visual: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default BoardgameCard;
