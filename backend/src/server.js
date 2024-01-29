/* eslint-disable @typescript-eslint/no-var-requires */
// importe le package http de Node
// (require est équivalent à import, mais permet de simplifier la syntaxe (pas d'extension, par exemple))
const http = require('http');

// importe notre application/fichier app express
const app = require('./app');

// création du serveur AVEC EXPRESS
const server = http.createServer(app);

// renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT);
app.set('port', port);

// recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
const errorHandler = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind =
    typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges.`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use.`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/* Ecouteur du serveur sur le numéro du port (3000, par défaut)) */
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? `pipe ${address}` : `port ${port}`;
  console.log(`Listening on ${bind}`);
});

server.listen(port);
