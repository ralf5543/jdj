/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BoardgameCard from '../BoardgameCard/BoardgameCard';
import Loader from '../genericComponents/Loader/Loader';
import './GamesListing.scss';

const GamesListing = ({ games }: any) => {
  const isLoaderVisible = useSelector(
    (state: Props) => state.layoutReducer.isLoading
  );

  // ================--------------------------- sort games cards
  const titleAscending = [...games].sort((a, b) =>
    a.title > b.title ? 1 : -1
  );
  const titleDescending = [...games].sort((a, b) =>
    a.title > b.title ? -1 : 1
  );
  const maxPlayersAscending = [...games].sort(
    (a, b) => a.maxplayers - b.maxplayers
  );
  const maxPlayersDescending = [...games].sort(
    (a, b) => b.maxplayers - a.maxplayers
  );
  const idealPlayersAscending = [...games].sort(
    (a, b) => a.idealplayers - b.idealplayers
  );
  const idealPlayersDescending = [...games].sort(
    (a, b) => b.idealplayers - a.idealplayers
  );

  const [sortGames, setSortGames] = useState(titleAscending);

  // By default, sort by alphabetic order, on loading o ge
  useEffect(() => {
    setSortGames(titleAscending);
  }, [games]);

  return (
    <div className="gameslisting_wrapper">
      {isLoaderVisible && <Loader />}

      <h2>Trier par</h2>
      <button
        type="button"
        onClick={() => {
          setSortGames(titleAscending);
        }}
      >
        A - Z
      </button>
      <button
        type="button"
        onClick={() => {
          setSortGames(titleDescending);
        }}
      >
        Z - A
      </button>

      <p>Nombre de joueurs maximum :</p>
      <button
        type="button"
        onClick={() => {
          setSortGames(maxPlayersDescending);
        }}
      >
        +
      </button>
      <button
        type="button"
        onClick={() => {
          setSortGames(maxPlayersAscending);
        }}
      >
        -
      </button>

      <p>Nombre de joueurs idéal :</p>
      <button
        type="button"
        onClick={() => {
          setSortGames(idealPlayersDescending);
        }}
      >
        +
      </button>
      <button
        type="button"
        onClick={() => {
          setSortGames(idealPlayersAscending);
        }}
      >
        -
      </button>

      {games.length > 0 && (
        <ul className="gameslisting">
          {sortGames.map((game: any) => (
            <BoardgameCard key={game._id} id={game._id} {...game} />
          ))}
        </ul>
      )}
    </div>
  );
};

type Props = {
  games: object[];
};

export default GamesListing;
