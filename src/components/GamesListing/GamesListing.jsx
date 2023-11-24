/* eslint-disable no-underscore-dangle */
import PropTypes from 'prop-types';
import BoardgameCard from '../BoardgameCard/BoardgameCard';
import './GamesListing.scss';

const GamesListing = ({ games }) => {
  return (
    <ul>
      {games.map((game) => (
        <BoardgameCard key={game._id} {...game} />
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
