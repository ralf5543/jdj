/* eslint-disable no-underscore-dangle */

import PropTypes from 'prop-types';
import BoardgameCard from '../BoardgameCard/BoardgameCard';
import './GamesListing.scss';

const GamesListing = ({ games }) => {
  console.log('Render de GamesListing');

  return (
    <ul className="gameslisting">
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
