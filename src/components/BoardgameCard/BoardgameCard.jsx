import axios from 'axios';
import { useDispatch } from 'react-redux';
import './BoardgameCard.scss';
import PropTypes from 'prop-types';
import { fetchGames } from '../../actions/games';

const BoardgameCard = ({
  description,
  title,
  maxplayers,
  idealplayers,
  duration,
  id,
}) => {
  const dispatch = useDispatch();

  const deleteGame = (idtest) => {
    axios
      .delete(`http://localhost:3000/api/games/${idtest}`)
      .then((response) => {
        // console.log(response);
        console.log('Suppression du  jeu ', title);
      })
      .catch((error) => {
        console.log('erreur de la requete : ', error);
      })
      .finally(() => {
        // Recharge la liste
        dispatch(fetchGames());
      });
  };
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
      <button
        onClick={() => {
          console.log('game id', id);

          deleteGame(id);
        }}
        type="button"
      >
        Supprimer ce jeu
      </button>
    </li>
  );
};

BoardgameCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  maxplayers: PropTypes.number.isRequired,
  idealplayers: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default BoardgameCard;
