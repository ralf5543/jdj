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
      <span className="boardgame-card_highlight">
        <span className="boardgame-card_highlight_amount">{maxplayers}</span>
        <span className="boardgame-card_highlight_wording">joueurs</span>
      </span>
      <picture className="boardgame-card_visual_wrapper">
        <img className="boardgame-card_visual" src={visual} alt="" />
      </picture>
      <div className="boardgame-card_content">
        <span className="boardgame-card_coop">Coopératif</span>
        <p className="boardgame-card_title">{title}</p>
        <p className="boardgame-card_description">{description}</p>
        <Link to={`/game/${id}`} className="boardgame-card_link">Fiche complète du jeu</Link>
      </div>
      <footer className="boardgame-card_footer">
        <p className="boardgame-card_footer_inner">
          <i className="fa-solid fa-clock" />
          <span className="boardgame-card_footer_highlight">{duration}</span>
          min
        </p>
        <p className="boardgame-card_footer_inner">
          <i className="fa-solid fa-user-group" />
          Joueurs max :
          <span className="boardgame-card_footer_highlight">{maxplayers}</span>
          (idéal :
          <span className="boardgame-card_footer_highlight">
            {idealplayers}
          </span>
          )
        </p>
      </footer>
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
