import { combineReducers } from 'redux';

import gamesReducer from './games';
import userReducer from './user';

const rootReducer = combineReducers({
  // nom du tiroir dans le state : nom du reducer qui s'en occupe
  games: gamesReducer,
  user: userReducer,
});

export default rootReducer;
