/* eslint-disable no-underscore-dangle */

import BoardgameCard from '../BoardgameCard/BoardgameCard';
import './GamesListing.scss';

const GamesListing = ({ games }: Props) => {
  console.log('Render de GamesListing');

  return (
    <ul className="gameslisting">
      {games.map((game) => (
        <BoardgameCard
          title=""
          description=""
          maxplayers={0}
          idealplayers={0}
          duration={0}
          visual=""
          userNickname=""
          key={game._id}
          id={game._id}
          {...game}
        />
      ))}
    </ul>
  );
};

type Props = {
  games: Array<{
    _id: string;
  }>;
};

export default GamesListing;
