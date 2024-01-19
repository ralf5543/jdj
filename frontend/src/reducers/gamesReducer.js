import {
  SAVE_GAMES,
  CHANGE_GAME_OWNERS,
  CHANGE_GAME_TITLE_FIELD,
  CHANGE_GAME_DESCRIPTION_FIELD,
  CHANGE_GAME_MINPLAYERS_FIELD,
  CHANGE_GAME_MAXPLAYERS_FIELD,
  CHANGE_GAME_IDEALPLAYERS_FIELD,
  CHANGE_GAME_DURATION_FIELD,
  CHANGE_GAME_CONFRONTATION_FIELD,
  UPLOAD_GAME_VISUAL,
  CHANGE_CURRENT_GAME_ID,
  POST_GAME,
  MODIFY_GAME,
  // DELETE_GAME,
} from '../actions/games';

export const initialState = {
  list: [],
  // indique si les jeux sont chargés
  areGamesLoaded: false,
  gameTitle: '',
  gameDescription: '',
  gameMinPlayers: '',
  gameMaxPlayers: '',
  gameIdealPlayers: '',
  gameDuration: '',
  gameConfrontation: '',
  gameVisual: '',
  currentGameId: '',
  gameOwners: '',
};

const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_GAMES:
      return {
        ...state,
        list: action.games,
        areGamesLoaded: true,
      };

    case CHANGE_GAME_OWNERS:
      return {
        ...state,
        gameOwners: action.newValue,
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

    case CHANGE_GAME_CONFRONTATION_FIELD:
      return {
        ...state,
        [action.gameConfrontationField]: action.newValue,
      };

    case CHANGE_GAME_MINPLAYERS_FIELD:
      return {
        ...state,
        [action.gameMinPlayersField]: action.newValue,
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

    case UPLOAD_GAME_VISUAL:
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
        gameMinPlayers: '',
        gameMaxPlayers: '',
        gameIdealPlayers: '',
        gameDuration: '',
        gameVisual: '',
        currentGameId: '',
      };

    case MODIFY_GAME:
      return {
        ...state,
        // clear all fields
        gameTitle: '',
        gameDescription: '',
        gameMinPlayers: '',
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
