/* eslint-disable react/no-unescaped-entities */
import { useRouteError } from 'react-router-dom';
import Page from '../genericComponents/Page/Page';
import AppHeader from '../AppHeader/AppHeader';

const Error = () => {
  const error = useRouteError();

  console.error(error);

  return (
    <>
      <AppHeader />
      <Page>
        <h1>Oops...</h1>
        <p>
          Une erreur s'est produite :<i>{error.statusText || error.message}</i>
        </p>
        <p>(vous êtes bien avancés comme ça...)</p>
      </Page>
    </>
  );
};

export default Error;
