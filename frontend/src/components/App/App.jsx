/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import { Routes, Route } from 'react-router';
import { useEffect } from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import UserSpace from '../UserSpace/UserSpace';
import { fetchGames } from '../../actions/games';
import BoardgameCard from '../BoardgameCard/BoardgameCard';
import Error from '../Error/Error';
import Home from '../Home/Home';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const action = fetchGames();
    dispatch(action);
  }, [dispatch]);

  console.log('render de App');

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-space" element={<UserSpace />} />
        <Route path="/game/:slug" element={<BoardgameCard />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
};

export default App;
