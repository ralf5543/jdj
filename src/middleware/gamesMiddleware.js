import axios from 'axios';
import { FETCH_GAMES, saveGames } from '../actions/recipes';

const gamesMiddleware = (store) => (next) => (action) => {
  // console.log('on a intercepté une action dans le middleware: ', action);

  switch (action.type) {
    case FETCH_GAMES:
      // console.log('aller chercher les jeux');
      axios
        .get('http://localhost:3000/api/games')
        .then((response) => {
          // console.log(response);
          console.log('affichage de la liste de jeux : ', response.data);
          store.dispatch(saveGames(response.data));
        })
        .catch((error) => {
          console.log('erreur de la requete : ', error);
        })
        .finally(() => {
          // console.log('le Finally qui sert à rien');
        });
      break;

      // il faut envoyer le token JWT => dans le header Authorization
      axios
        .get(
          // URL
          'http://localhost:3001/favorites',
          // options (notamment les headers)
          {
            headers: {
              // nom: contenu
              // on fournit le token JWT dans le header Authorization, en faisant
              // précéder par le mot Bearer
              Authorization: `Bearer ${store.getState().user.token}`,
            },
          }
        )
        .then((response) => {
          // console.log(response);
          store.dispatch(saveFavoriteRecipes(response.data.favorites));
        });
      break;

    default:
  }

  // on passe l'action au suivant (middleware suivant ou reducer)
  next(action);
};

export default gamesMiddleware;
