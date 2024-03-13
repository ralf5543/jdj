import { useContext } from 'react';
import './BoardgameCard.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import { ThemeContext } from '../../utils/context';

const BoardgameCard = ({
  description,
  title,
  minplayers,
  maxplayers,
  idealplayers,
  duration,
  visual,
  confrontation,
  id,
}: Props) => {

  const { theme } = useContext(ThemeContext);
  const allUsers = useSelector((state: Props) => state.user.users);

  const gameOwners = allUsers.filter((user) => user.ownedGames.includes(id));

  return (
    // animations from Framer Motion (reduced weight with "m" instead of "motion")
    <LazyMotion features={domAnimation}>
      <m.li
        className={`boardgame-card ${theme}-theme`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
      >
        <span className="boardgame-card_highlight">
          <span className="boardgame-card_highlight_amount">
            {minplayers} - {maxplayers}
          </span>
          <span className="boardgame-card_highlight_wording">joueurs</span>
        </span>
        <picture className="boardgame-card_visual_wrapper">
          <LazyLoadImage
            src={`${import.meta.env.VITE_BASE_URL}/images/${visual}`}
            alt={`Visual of ${title} game`}
            className="boardgame-card_visual"
          />
        </picture>
        <div className="boardgame-card_content">
          <span className="boardgame-card_coop">{confrontation}</span>
          <p className="boardgame-card_title">{title}</p>
          <p className="boardgame-card_description">{description}</p>

          {gameOwners.length > 0 ? (
            <p className="boardgame-card_owners_name">
              Détenu par {gameOwners.length}{' '}
              {`Joueur${gameOwners.length > 1 ? 's' : ''} du Jeudi`}
            </p>
          ) : (
            <p className="boardgame-card_owners_none">Plus aucun Joueur du Jeudi ne possède ce jeu !</p>
          )}

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
            Nombre de joueurs :
            <span className="boardgame-card_footer_highlight">
              {minplayers} - {maxplayers}
            </span>
            (idéal :
            <span className="boardgame-card_footer_highlight">
              {idealplayers}
            </span>
            )
          </p>
        </footer>
      </m.li>
    </LazyMotion>
  );
};

type Props = {
  title: string;
  description: string;
  minplayers: number;
  maxplayers: number;
  idealplayers: number;
  duration: number;
  visual: string;
  confrontation: string;
  id: string;
};

export default BoardgameCard;
