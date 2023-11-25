// ici on placera les actions qui concernent les jeux
export const FETCH_GAMES = 'FETCH_GAMES';
export const SAVE_GAMES = 'SAVE_GAMES';

export const fetchGames = () => ({
  type: FETCH_GAMES,
});

export const saveGames = (games) => ({
  type: SAVE_GAMES,
  games,
  // property shorthand : quand le nom de la propriété est identique à ce qu'on veut placer dedans
  // ici c'est équivalent à games: games
});
