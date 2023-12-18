import { useSelector } from 'react-redux';
import Page from '../genericComponents/Page/Page';
import GamesListing from '../GamesListing/GamesListing';

const Home = () => {
  const games = useSelector((state) => state.games.list);

  return (
    <Page>
      <h1>Ceci est la home</h1>
      <GamesListing games={games} />
    </Page>
  );
};

export default Home;
