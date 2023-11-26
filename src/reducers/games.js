import { SAVE_GAMES, CHANGE_TEST_FIELD } from '../actions/games';

export const initialState = {
  list: [],
  // indique si les jeux sont chargés
  areGamesLoaded: false,
  test: '',
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

    case CHANGE_TEST_FIELD:
      return {
        ...state,
        [action.testfield]: action.newValue,
      };

    default:
      return state;
  }
};

export default reducer;
