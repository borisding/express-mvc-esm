import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import favicon from 'serve-favicon';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import { doubleCsrf } from 'csrf-csrf';
import { Eta } from 'eta';

import assets from '#build/assets';
import { isProd, paths } from '#utils';
import { buildEtaEngine } from '#helpers/template';

import { httpLogger } from '#middleware/httpLogger';
import { csrfToken } from '#middleware/csrfToken';
import { notFound } from '#middleware/notFound';
import { errorHandler } from '#middleware/errorHandler';

import { homeRouter } from '#routers/home';

const CSRF_SECRET = process.env.CSRF_SECRET;
const COOKIE_SECRET = process.env.COOKIE_SECRET;

// configuration for double csrf
const { doubleCsrfProtection, generateToken } = doubleCsrf({
  cookieName: 'x-csrf-token',
  cookieOptions: { sameSite: 'lax', secure: !!isProd },
  ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
  getSecret: () => CSRF_SECRET,
  getTokenFromRequest: req => req.body._csrfToken
});

// app view engine and directory config
const eta = new Eta({
  views: `${paths.app}/views`,
  cache: !!isProd,
  debug: !isProd
});

const app = express();

// locals variable assignments for template usage
app.locals.assets = assets;
app.locals.isProd = isProd;

app
  .engine('eta', buildEtaEngine(eta))
  .set('view engine', 'eta')
  .set('view cache', !!isProd)
  .set('views', eta.config.views);

// mount app middleware
app
  .use(helmet())
  .use(httpLogger())
  .use(cookieParser(COOKIE_SECRET))
  .use(compression())
  .use(express.json())
  .use(express.urlencoded({ extended: true }), hpp())
  .use(express.static(paths.static))
  .use(favicon(`${paths.static}/favicon.ico`))
  .use(csrfToken(generateToken))
  .use(doubleCsrfProtection);

// app routes
app.use('/', homeRouter);

// app error handlers
app.use(notFound());
app.use(errorHandler());

export default app;
