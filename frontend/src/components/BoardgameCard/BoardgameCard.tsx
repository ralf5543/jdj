import './BoardgameCard.scss';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const BoardgameCard = ({
  description,
  title,
  maxplayers,
  idealplayers,
  duration,
  visual,
  id,
  userNickname,
}: any) => {
  return (
    <li className="boardgame-card">
      <span className="boardgame-card_highlight">
        <span className="boardgame-card_highlight_amount">{maxplayers}</span>
        <span className="boardgame-card_highlight_wording">joueurs</span>
      </span>
      <picture className="boardgame-card_visual_wrapper">
        <LazyLoadImage src={visual} alt={`Visual of ${title} game`} />
      </picture>
      <div className="boardgame-card_content">
        <span className="boardgame-card_coop">Coopératif</span>
        <p className="boardgame-card_title">{title}</p>
        <p className="boardgame-card_description">{description}</p>
        <p className="boardgame-card_owners">
          Détenu par{' '}
          <span className="boardgame-card_owners_name">{userNickname}</span>
        </p>
        <Link to={`/game/${id}`} className="boardgame-card_link">
          Fiche complète du jeu
        </Link>
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

type Props = {
  title: string;
  description: string;
  maxplayers: number;
  idealplayers: number;
  duration: number;
  visual: string;
  id: string;
  userNickname: string;
};

export default BoardgameCard;
