import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import favicon from 'serve-favicon';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { doubleCsrf } from 'csrf-csrf';
import { Eta } from 'eta';

import * as middleware from './middleware/index.js';
import * as routers from './routers/index.js';
import assets from '../public/build/assets.js';
import { env, paths } from '../utils/index.js';
import { buildEtaEngine } from './helpers/template.js';

const CSRF_SECRET = process.env.CSRF_SECRET;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

// configuration for double csrf
const { doubleCsrfProtection, generateToken } = doubleCsrf({
  cookieName: 'x-csrf-token',
  cookieOptions: { sameSite: 'lax', secure: !!env.isProd },
  ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
  getSecret: () => CSRF_SECRET,
  getTokenFromRequest: req => req.body._csrfToken
});

// app view engine and directory config
const eta = new Eta({
  views: `${paths.assets}/views`,
  cache: !!env.isProd,
  debug: !!env.isDev
});

const app = express();

// locals variable assignments for template usage
app.locals.assets = assets;
app.locals.isDev = env.isDev;

app
  .engine('eta', buildEtaEngine(eta))
  .set('view engine', 'eta')
  .set('view cache', !!env.isProd)
  .set('views', eta.config.views);

// mount app middleware
app
  .use(helmet())
  .use(middleware.httpLogger())
  .use(cookieParser(COOKIE_SECRET))
  .use(compression())
  .use(express.json())
  .use(express.urlencoded({ extended: true }), hpp())
  .use(express.static(paths.public))
  .use(favicon(`${paths.public}/favicon.ico`))
  .use(middleware.csrfToken(generateToken))
  .use(doubleCsrfProtection);

// app routes
app.use('/', routers.home);

// app error handlers
app.use(middleware.notFound());
app.use(middleware.errorHandler());

export default app;
