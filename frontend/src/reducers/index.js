import { combineReducers } from 'redux';

import gamesReducer from './gamesReducer';
import userReducer from './user';
import layoutReducer from './layoutReducer';

const rootReducer = combineReducers({
  // nom du tiroir dans le state : nom du reducer qui s'en occupe
  gamesReducer,
  user: userReducer,
  layoutReducer,
});

export default rootReducer;
