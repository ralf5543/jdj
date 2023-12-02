/* eslint-disable @typescript-eslint/no-var-requires */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // On extraitle token du header Authorization de la requête entrante.
    // Comme il contient le mot-clé Bearer, on split pour tout récupérer après l'espace dans le header.
    const token = req.headers.authorization.split(' ')[1];
    // vérification du token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    // On, extrait l'user ID du token et on le rajoute à la request
    const { userId } = decodedToken;
    req.auth = {
      userId,
    };
    // si tout est ok, on exécute
    next();

    // sinon erreur 401
  } catch (error) {
    res.status(401).json({ error });
  }
};
