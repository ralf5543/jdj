/* eslint-disable no-underscore-dangle */
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import BoardgameCard from '../BoardgameCard/BoardgameCard';
import Loader from '../genericComponents/Loader/Loader';
import './GamesListing.scss';

const GamesListing = ({ games }: any) => {
  const isLoaderVisible = useSelector(
    (state: Props) => state.layoutReducer.isLoading
  );

  return (
    <div className="gameslisting_wrapper">
      {isLoaderVisible && <Loader />}
      <ul className="gameslisting">
        {games.map((game: any) => (
          <BoardgameCard key={game._id} id={game._id} {...game} />
        ))}
      </ul>
    </div>
  );
};

type Props = {
  games: object[];
};

export default GamesListing;
