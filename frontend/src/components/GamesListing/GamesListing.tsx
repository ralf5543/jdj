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

  const [filterGames, setFilterGames] = useState(titleAscending);
  // const [searchGame, setSearchGame] = useState('');

  // By default, sort by alphabetic order, on loading
  useEffect(() => {
    setFilterGames(titleAscending);
  }, [games]);

  const handleFilter = (e) => {
    const { value } = e.target;
    // const lowerCased = value.toLowerCase();
    const filtered = games.filter((game) =>
      game.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilterGames(filtered);
    console.log('value : ', value);
  };

  return (
    <div className="gameslisting_wrapper">
      {isLoaderVisible && <Loader />}

      <header className="gameslisting_sort">
        <p>Trier par</p>
        <button
          type="button"
          onClick={() => {
            setFilterGames(titleAscending);
          }}
        >
          A - Z
        </button>
        <button
          type="button"
          onClick={() => {
            setFilterGames(titleDescending);
          }}
        >
          Z - A
        </button>

        <p>Nombre de joueurs maximum :</p>
        <button
          type="button"
          onClick={() => {
            setFilterGames(maxPlayersDescending);
          }}
        >
          +
        </button>
        <button
          type="button"
          onClick={() => {
            setFilterGames(maxPlayersAscending);
          }}
        >
          -
        </button>

        <p>Nombre de joueurs idéal :</p>
        <button
          type="button"
          onClick={() => {
            setFilterGames(idealPlayersDescending);
          }}
        >
          +
        </button>
        <button
          type="button"
          onClick={() => {
            setFilterGames(idealPlayersAscending);
          }}
        >
          -
        </button>
      </header>

      <div className="field">
        <input
          type="text"
          onChange={handleFilter}
          placeholder="Nom du jeu"
          id="filterfield"
        />
        <label htmlFor="filterfield" className="field_label">
          Chercher un jeu par son titre
        </label>
      </div>

      {games.length > 0 && (
        <ul className="gameslisting">
          {filterGames.map((game: any) => (
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
