import express from 'express';
import chalk from 'chalk';
import * as eta from 'eta';

import * as routers from './routers/index.js';
import { isDev, paths } from './utils.js';

const app = express();

// app view engine and directories config
eta.configure({ cache: !isDev });
app
  .engine('eta', eta.renderFile)
  .set('view engine', 'eta')
  .set('views', [paths.views]);

// app middleware

// app routes
app.use('/', routers.home);

// running express app server
const PORT = parseInt(process.env.PORT, 10) ?? 5000;
app
  .listen(PORT, () => {
    console.log(chalk.cyan('App server is up, listening PORT:'), PORT);
  })
  .on('error', err => {
    console.error(chalk.red(err.message));
    process.exit(-1);
  });
