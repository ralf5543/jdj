import { combineReducers } from 'redux';

import gamesReducer from './games';
import userReducer from './user';
import layoutReducer from './layout';

const rootReducer = combineReducers({
  // nom du tiroir dans le state : nom du reducer qui s'en occupe
  games: gamesReducer,
  user: userReducer,
  layout: layoutReducer,
});

export default rootReducer;
