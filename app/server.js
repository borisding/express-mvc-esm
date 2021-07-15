import express from 'express';
import chalk from 'chalk';
import helmet from 'helmet';
import hpp from 'hpp';
import favicon from 'serve-favicon';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import csurf from 'csurf';
import * as eta from 'eta';

import * as middleware from './middleware/index.js';
import * as routers from './routers/index.js';
import { env, paths } from '../utils/index.js';

const app = express();

// app view engine and directory config
eta.configure({ cache: env.isProd });
app
  .engine('eta', eta.renderFile)
  .set('view engine', 'eta')
  .set('views', `${paths.assets}/views`);

// app middleware
app
  .use(helmet())
  .use(middleware.httpLogger())
  .use(cookieParser())
  .use(compression())
  .use(express.json())
  .use(express.urlencoded({ extended: true }), hpp())
  .use(express.static(paths.public))
  .use(favicon(`${paths.public}/favicon.ico`))
  .use(csurf({ cookie: true }), middleware.csrfToken());

// app routes
app.use('/', routers.home);

// app error handlers
app.use(middleware.notFound());
app.use(middleware.errorHandler());

// running express app server
const PORT = parseInt(process.env.PORT, 10) || 5000;
app
  .listen(PORT, () => {
    console.log(chalk.cyan('App server is up, listening PORT:'), PORT);
  })
  .on('error', err => {
    console.error(chalk.red(err.message));
    process.exit(1);
  });
