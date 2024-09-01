import chalk from 'chalk';
import app from './app.js';

// running express app server
const PORT = parseInt(process.env.PORT, 10) || 8080;
const server = app.listen(PORT, () => {
  console.log(chalk.cyan('App server is up, listening PORT:'), PORT);
});

server.on('error', err => {
  switch (err.code) {
    case 'EACCES':
      console.error(chalk.red('Not enough privileges to run app server.'));
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(chalk.red(`${PORT} is already in use.`));
      process.exit(1);
      break;
    default:
      throw err;
  }
});

// handle server shutdown, gracefully
const serverCloseHandler = exitCode => () => {
  server.close(() => {
    process.exit(exitCode);
  });
};

process.on('uncaughtException', serverCloseHandler(1));
process.on('unhandledRejection', serverCloseHandler(1));

['SIGINT', 'SIGTERM', 'SIGHUP'].forEach(signal => {
  process.on(signal, serverCloseHandler(0));
});
