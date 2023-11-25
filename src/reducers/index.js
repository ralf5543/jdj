import { combineReducers } from 'redux';

import gamesReducer from './games';

const rootReducer = combineReducers({
  // nom du tiroir dans le state : nom du reducer qui s'en occupe
  games: gamesReducer,
});

export default rootReducer;
