/* eslint-disable no-underscore-dangle */

import BoardgameCard from '../BoardgameCard/BoardgameCard';
import './GamesListing.scss';

const GamesListing = ({ games }: Props) => {
  return (
    <ul className="gameslisting">
      {games.map((game) => (
        <BoardgameCard key={game._id} id={game._id} {...game} />
      ))}
    </ul>
  );
};

type Props = {
  games: Array<{
    _id: string;
    title: string;
    description: string;
    visual: string;
    userNickname: string;
    maxplayers: number;
    idealplayers: number;
    duration: number;
  }>;
};

export default GamesListing;
