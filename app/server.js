import express from 'express';
import chalk from 'chalk';
import * as eta from 'eta';

import * as routers from './routers/index.js';
import { env, paths } from '../utils/index.js';

const app = express();

// app view engine and directory config
eta.configure({ cache: !env.isProd });
app
  .engine('eta', eta.renderFile)
  .set('view engine', 'eta')
  .set('views', `${paths.public}/views`);

// app middleware

// app routes
app.use('/', routers.home);

// running express app server
const PORT = parseInt(process.env.PORT, 10) || 5000;
app
  .listen(PORT, () => {
    console.log(chalk.cyan('App server is up, listening PORT:'), PORT);
  })
  .on('error', err => {
    console.error(chalk.red(err.message));
    process.exit(-1);
  });
