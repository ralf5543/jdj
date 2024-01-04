/* eslint-disable no-underscore-dangle */

import BoardgameCard from '../BoardgameCard/BoardgameCard';
import './GamesListing.scss';

const GamesListing = ({ games }: any) => {
  return (
    <ul className="gameslisting">
      {games.map((game: any) => (
        <BoardgameCard key={game._id} id={game._id} {...game} />
      ))}
    </ul>
  );
};

type Props = {
  games: object[];
};

export default GamesListing;
