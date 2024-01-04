import {
  SAVE_GAMES,
  CHANGE_GAME_TITLE_FIELD,
  CHANGE_GAME_DESCRIPTION_FIELD,
  CHANGE_GAME_MAXPLAYERS_FIELD,
  CHANGE_GAME_IDEALPLAYERS_FIELD,
  CHANGE_GAME_DURATION_FIELD,
  CHANGE_GAME_VISUAL,
  CHANGE_CURRENT_GAME_ID,
  POST_GAME,
  // DELETE_GAME,
} from '../actions/games';

export const initialState = {
  list: [],
  // indique si les jeux sont chargés
  areGamesLoaded: false,
  gameTitle: '',
  gameDescription: '',
  gameMaxPlayers: '',
  gameIdealPlayers: '',
  gameDuration: '',
  gameVisual: '',
  currentGameId: '',
};

/* reducer qui s'occupe de ce qui concerne les jeux */
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_GAMES:
      return {
        ...state,
        list: action.games,
        // on indique que les recettes sont chargées
        areGamesLoaded: true,
      };

    case CHANGE_GAME_TITLE_FIELD:
      return {
        ...state,
        [action.gameTitleField]: action.newValue,
      };

    case CHANGE_GAME_DESCRIPTION_FIELD:
      return {
        ...state,
        [action.gameDescriptionField]: action.newValue,
      };

    case CHANGE_GAME_MAXPLAYERS_FIELD:
      return {
        ...state,
        [action.gameMaxPlayersField]: action.newValue,
      };

    case CHANGE_GAME_IDEALPLAYERS_FIELD:
      return {
        ...state,
        [action.gameIdealPlayersField]: action.newValue,
      };

    case CHANGE_GAME_DURATION_FIELD:
      return {
        ...state,
        [action.gameDurationField]: action.newValue,
      };

    case CHANGE_GAME_VISUAL:
      return {
        ...state,
        gameVisual: action.newValue.status,
      };

    case CHANGE_CURRENT_GAME_ID:
      return {
        ...state,
        currentGameId: action.newValue,
      };

    case POST_GAME:
      return {
        ...state,
        // clear all fields
        gameTitle: '',
        gameDescription: '',
        gameMaxPlayers: '',
        gameIdealPlayers: '',
        gameDuration: '',
        gameVisual: '',
        currentGameId: '',
      };

    default:
      return state;
  }
};

export default reducer;
