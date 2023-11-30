import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

/* on importe le reducer principal */
import reducer from '../reducers';

import gamesMiddleware from '../middleware/gamesMiddleware';
import userMiddleware from '../middleware/userMiddleware';

// on combine devTools avec les middlewares
const enhancers = composeWithDevTools(
  applyMiddleware(
    gamesMiddleware,
    userMiddleware
    // ... d'autres middlewares
  )
);

const store = createStore(
  // reducer
  reducer,
  // enhancer
  enhancers
);

export default store;
