/* eslint-disable import/prefer-default-export */
/* eslint-disable arrow-body-style */

/**
 *  on trouve la recette voulue dans la liste des recettes
 * @param {Array} games - toutes les recettes
 * @param {string} searchedSlug - le slug de la recette recherchée
 * @return {Object} - La recette trouvée
 */
export function findGame(games, searchedSlug) {
  const game = games.find((testedGame) => {
    return testedGame.id === searchedSlug;
  });
  return game;
}
