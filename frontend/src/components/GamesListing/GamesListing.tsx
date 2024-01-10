/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import BoardgameCard from '../BoardgameCard/BoardgameCard';
import Loader from '../genericComponents/Loader/Loader';
import './GamesListing.scss';

const GamesListing = ({ games }: Props) => {
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

  const newGamesFirst = [...games].reverse();

  const [filterGames, setFilterGames] = useState(titleAscending);

  // By default, sort by most recent date, on loading
  useEffect(() => {
    setFilterGames(newGamesFirst);
  }, [games]);

  const handleFilter = (e: React.ChangeEvent) => {
    const { value } = e.target;
    // const lowerCased = value.toLowerCase();
    const filtered = games.filter((game: { title: string }) =>
      game.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilterGames(filtered);
  };

  return (
    <div className="gameslisting_wrapper">
      {isLoaderVisible && <Loader />}

      <header className="gameslisting_sort">
        <p>Date d'ajout :</p>

        <div className="gameslisting_sort_cta_wrapper">
          <button
            className="gameslisting_sort_cta"
            type="button"
            onClick={() => {
              setFilterGames(newGamesFirst);
            }}
          >
            <i class="fa-solid fa-sort-up"></i>
          </button>
          <button
            className="gameslisting_sort_cta"
            type="button"
            onClick={() => {
              // the original array
              setFilterGames(games);
            }}
          >
            <i class="fa-solid fa-sort-down"></i>
          </button>
        </div>
        <p>Ordre alphabétique :</p>
        <div className="gameslisting_sort_cta_wrapper">
          <button
            className="gameslisting_sort_cta"
            type="button"
            onClick={() => {
              setFilterGames(titleAscending);
            }}
          >
            <i class="fa-solid fa-arrow-down-a-z"></i>
          </button>
          <button
            className="gameslisting_sort_cta"
            type="button"
            onClick={() => {
              setFilterGames(titleDescending);
            }}
          >
            <i class="fa-solid fa-arrow-down-z-a"></i>
          </button>
        </div>

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
  layoutReducer: any;
  games: object[];
};

export default GamesListing;
