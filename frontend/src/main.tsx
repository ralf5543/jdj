import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { disableReactDevTools } from '@fvilers/disable-react-devtools';

import App from './components/App/App';
import Error from './components/Error/Error';
import UserSpace from './components/UserSpace/UserSpace';
import GameSheet from './components/GameSheet/GameSheet';
import store from './store';

import './styles/index.scss';
import Home from './components/Home/Home';

if (process.env.NODE_ENV === 'production') {
  disableReactDevTools();
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Provider store={store}>
        <App />
      </Provider>
    ),
    errorElement: (
      <Provider store={store}>
        <Error />
      </Provider>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/user-space',
        element: <UserSpace />,
      },
      {
        path: '/game/:id',
        element: <GameSheet />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
