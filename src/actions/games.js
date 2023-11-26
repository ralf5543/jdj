// ici on placera les actions qui concernent les jeux
export const FETCH_GAMES = 'FETCH_GAMES';
export const POST_GAME = 'POST_GAME';
export const SAVE_GAMES = 'SAVE_GAMES';
export const DELETE_GAME = 'DELETE_GAME';
export const CHANGE_GAME_TITLE_FIELD = 'CHANGE_GAME_TITLE_FIELD';

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

export const changeGameTitleField = (newValue, gameTitleField) => ({
  type: CHANGE_GAME_TITLE_FIELD,
  newValue,
  gameTitleField,
});

export const deleteGame = () => ({
  type: DELETE_GAME,
});
