/* eslint-disable no-underscore-dangle */

import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import BoardgameCard from '../BoardgameCard/BoardgameCard';
import './GamesListing.scss';

const GamesListing = () => {
  const games = useSelector((state) => state.games.list);
  return (
    <ul>
      {games.map((game) => (
        <BoardgameCard key={game._id} id={game._id} {...game} />
      ))}
    </ul>
  );
};

GamesListing.propTypes = {
  games: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default GamesListing;
