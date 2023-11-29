// ici on placera les actions qui concernent les jeux
export const FETCH_GAMES = 'FETCH_GAMES';
export const POST_GAME = 'POST_GAME';
export const SAVE_GAMES = 'SAVE_GAMES';
export const CHANGE_GAME_TITLE_FIELD = 'CHANGE_GAME_TITLE_FIELD';
export const CHANGE_GAME_DESCRIPTION_FIELD = 'CHANGE_GAME_DESCRIPTION_FIELD';
export const CHANGE_GAME_MAXPLAYERS_FIELD = 'CHANGE_GAME_MAXPLAYERS_FIELD';
export const CHANGE_GAME_IDEALPLAYERS_FIELD = 'CHANGE_GAME_IDEALPLAYERS_FIELD';
export const CHANGE_GAME_DURATION_FIELD = 'CHANGE_GAME_DURATION_FIELD';
export const CHANGE_GAME_VISUAL_FIELD = 'CHANGE_GAME_VISUAL_FIELD';

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

export const changeGameDescriptionField = (newValue, gameDescriptionField) => ({
  type: CHANGE_GAME_DESCRIPTION_FIELD,
  newValue,
  gameDescriptionField,
});

export const changeGameMaxPlayersField = (newValue, gameMaxPlayersField) => ({
  type: CHANGE_GAME_MAXPLAYERS_FIELD,
  newValue,
  gameMaxPlayersField,
});

export const changeGameIdealPlayersField = (
  newValue,
  gameIdealPlayersField
) => ({
  type: CHANGE_GAME_IDEALPLAYERS_FIELD,
  newValue,
  gameIdealPlayersField,
});

export const changeGameDurationField = (newValue, gameDurationField) => ({
  type: CHANGE_GAME_DURATION_FIELD,
  newValue,
  gameDurationField,
});

export const changeGameVisualField = (newValue, gameVisualField) => ({
  type: CHANGE_GAME_VISUAL_FIELD,
  newValue,
  gameVisualField,
});