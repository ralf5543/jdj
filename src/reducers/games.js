import { SAVE_GAMES } from '../actions/recipes';

export const initialState = {
  list: ['aaaa', 'vvvv'],
  // les recettes préférées (quand l'utilisateur est connecté)

  // indique si les jeux sont chargés
  areGamesLoaded: false,
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

    default:
      return state;
  }
};

export default reducer;
