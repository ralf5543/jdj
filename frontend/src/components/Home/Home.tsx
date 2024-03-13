/* eslint-disable react/jsx-no-bind */
import { useSelector } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import Page from '../genericComponents/Page/Page';
import GamesListing from '../GamesListing/GamesListing';
import Button from '../genericComponents/Button/Button';

const Home = () => {
  const games = useSelector((state: Props) => state.gamesReducer.list);

  function fallbackRender({ error, resetErrorBoundary }) {
    // Call resetErrorBoundary() to reset the error boundary and retry the render.

    return (
      <div role="alert">
        <h2>Impossible de charger la liste de jeux :</h2>
        <pre style={{ color: 'red' }}>{error.message}</pre>
        <p>Merci de nous signaler cette erreur.</p>
        <Button
          label="Recharger la liste"
          type="button"
          onClick={resetErrorBoundary}
        />
      </div>
    );
  }

  return (
    <Page>
      <h1>La ludothèque des JdJ</h1>
      <ErrorBoundary
        fallbackRender={fallbackRender}
        onReset={(details) => {
          // Reset the state of your app so the error doesn't happen again
          console.log('details : ', details);
        }}
      >
        <GamesListing games={games} />
      </ErrorBoundary>
    </Page>
  );
};

type Props = {
  [key: string]: {
    // array of objects
    list: object[];
  };
};

export default Home;
