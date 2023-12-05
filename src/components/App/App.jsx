/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import GamesListing from '../GamesListing/GamesListing';
import UserSpace from '../UserSpace/UserSpace';
import AppHeader from '../AppHeader/AppHeader';
import { fetchGames } from '../../actions/games';

const App = () => {
  const games = useSelector((state) => state.games.list);

  const dispatch = useDispatch();

  useEffect(() => {
    const action = fetchGames();
    dispatch(action);
  }, [dispatch]);

  console.log('render de App');

  const [image, setImage] = useState();

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    // e.preventDefault;
  };

  const submitImage = async (e) => {
    e.preventDefault();
    console.log('submit !');

    const formData = new FormData();
    formData.append('image', image);

    const result = await axios.post(
      'http://localhost:3000/upload-image',
      formData,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
  };

  return (
    <div className="App">
      <form onSubmit={submitImage}>
        <input type="file" accept="image/" onChange={onInputChange} />
        <button type="submit">Upload, merde !!!</button>
      </form>

      <AppHeader />
      <UserSpace />
      <GamesListing games={games} />
    </div>
  );
};

export default App;
