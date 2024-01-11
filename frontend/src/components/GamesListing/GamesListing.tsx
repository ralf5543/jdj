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

  const minPlayersNumber = [...games];

  const newGamesFirst = [...games].reverse();

  const [filterGames, setFilterGames] = useState(titleAscending);

  // By default, sort by most recent date, on loading
  useEffect(() => {
    setFilterGames(newGamesFirst);
  }, [games]);

  const handlePlayersNumber = (e: React.ChangeEvent) => {
    const { value } = e.target;
    const filtered = games.filter((game: { title: string }) =>
      game.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilterGames(filtered);
  };

  const handleFilter = (e: React.ChangeEvent) => {
    const { value } = e.target;
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
            <i className="fa-solid fa-arrow-up" />
          </button>
          <button
            className="gameslisting_sort_cta"
            type="button"
            onClick={() => {
              // the original array
              setFilterGames(games);
            }}
          >
            <i className="fa-solid fa-arrow-down" />
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
            <i className="fa-solid fa-arrow-down-a-z" />
          </button>
          <button
            className="gameslisting_sort_cta"
            type="button"
            onClick={() => {
              setFilterGames(titleDescending);
            }}
          >
            <i className="fa-solid fa-arrow-down-z-a" />
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
      <p>Nombre de joueurs minimum :</p>
      <div className="field">
        <select
          name="playersNb"
          id="playersNb"
          onChange={() => {
            setFilterGames(minPlayersNumber);
          }}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8 et +">8</option>
        </select>

        <label htmlFor="pet-select">Choose a pet:</label>
      </div>

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
