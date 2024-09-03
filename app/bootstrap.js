import app from './app.js';

// running express app server
const PORT = parseInt(process.env.PORT, 10) || 8080;
const server = app.listen(PORT, () => {
  console.log(`Application is running... (PORT: ${PORT})`);
});

server.on('error', err => {
  if (err.code === 'EACCES') {
    console.error('Not enough privileges to run app server.');
    process.exit(1);
  } else if (err.code === 'EADDRINUSE') {
    console.error(`${PORT} is already in use.`);
    process.exit(1);
  } else {
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
