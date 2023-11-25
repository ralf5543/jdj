import './BoardgameCard.scss';
import PropTypes from 'prop-types';

const BoardgameCard = ({
  description,
  title,
  maxplayers,
  idealplayers,
  duration,
}) => {
  return (
    <li className="boardgame-card">
      <h2 className="boardgame-card_title">{title}</h2>
      <img
        className="boardgame-card_visual"
        src="https://picsum.photos/300/300"
        alt=""
      />
      <p className="boardgame-card_description">{description}</p>
      <p className="boardgame-card_maxplayers">
        Nombre de joueurs MAX : {maxplayers}
      </p>
      <p className="boardgame-card_idealplayers">
        Nombre de joueurs idéal : {idealplayers}
      </p>
      <p className="boardgame-card_duration">{duration} minutes</p>
    </li>
  );
};

BoardgameCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  maxplayers: PropTypes.number.isRequired,
  idealplayers: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};

export default BoardgameCard;
