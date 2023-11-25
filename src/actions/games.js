// ici on placera les actions qui concernent les jeux
export const FETCH_GAMES = 'FETCH_GAMES';
export const POST_GAME = 'POST_GAME';
export const SAVE_GAMES = 'SAVE_GAMES';
export const CHANGE_TEST_FIELD = 'CHANGE_TEST_FIELD';

export const fetchGames = () => ({
  type: FETCH_GAMES,
});

export const postGame = () => ({
  type: POST_GAME,
});

export const saveGames = (games) => ({
  type: SAVE_GAMES,
  games,
  // property shorthand : quand le nom de la propriété est identique à ce qu'on veut placer dedans
  // ici c'est équivalent à games: games
});

export const changeTestField = (games) => ({
  type: CHANGE_TEST_FIELD,
  games,
});
