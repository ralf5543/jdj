import { useRouteError } from 'react-router-dom';
import Page from '../genericComponents/Page/Page';

const Error = () => {
  const error = useRouteError();

  console.error(error);

  return (
    <>
      <h1>Oops...</h1>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </>
  );
};

export default Error;
