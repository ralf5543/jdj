/* eslint-disable no-underscore-dangle */
import { useEffect, useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import BoardgameCard from '../BoardgameCard/BoardgameCard';
import Loader from '../genericComponents/Loader/Loader';
import './GamesListing.scss';
import { ThemeContext } from '../../utils/context';

const GamesListing = ({ games }: Props) => {
  const {toggleTheme, theme} = useContext(ThemeContext);
  const isLoaderVisible = useSelector(
    (state: Props) => state.layoutReducer.isLoading
  );

  // ================--------------------------- sort games cards
  const titleAscending = [...games].sort((a, b) =>
    a.title > b.title ? 1 : -1
  );

  const newGamesFirst = [...games].reverse();

  const [filterGames, setFilterGames] = useState(titleAscending);

  // By default, sort by most recent date, on loading
  useEffect(() => {
    setFilterGames(newGamesFirst);
  }, [games]);

  const handlePlayersNumber = (e: React.ChangeEvent) => {
    const { value } = e.target;

    // First, filter on available games with minimum players below the chosen value
    const minFiltered = games.filter(
      (game) => Number(game.minplayers) <= value
    );

    // Then, filter this news array with max players games available
    const maxFiltered = minFiltered.filter(
      (game) => Number(game.maxplayers) >= value
    );

    setFilterGames(maxFiltered);
  };

  const handleFilter = (e: React.ChangeEvent) => {
    const { value } = e.target;

    // Search filter doesn't care about capitalized letters
    const filtered = games.filter((game: { title: string }) =>
      game.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilterGames(filtered);
  };

  return (
    <div className={`gameslisting_wrapper ${theme}-theme`}>
      <h1>Theme : {theme}</h1>
      {isLoaderVisible && <Loader />}

      <header className="gameslisting_header">
        <p>
          Recherchez un jeu en fonction du nombre de vos joueurs, ou directement
          par son titre.
        </p>

        <div className="fields_columns">
          <div className="field">
            <select
              name="playersNb"
              id="playersNb"
              onChange={handlePlayersNumber}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8 et +</option>
            </select>

            <label htmlFor="playersNb" className="field_label">
              Nombre de joueurs :
            </label>
          </div>

          <div className="field field--full-width">
            <input
              type="text"
              onChange={handleFilter}
              placeholder="Nom du jeu"
              id="filterfield"
            />
            <label htmlFor="filterfield" className="field_label">
              Titre du jeu
            </label>
          </div>
        </div>
      </header>

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
