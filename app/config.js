import path from 'path';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

// expand existing environment variables
const result = dotenvExpand.expand(dotenv.config());
const parsed = result.parsed;

// get parsed/stringified values of dot env variables
export const getDefinedDotEnv = () => {
  if (!parsed) return { parsed: {}, stringified: {} };

  const stringified = Object.keys(parsed).reduce((result, key) => {
    result[`process.env.${key}`] = JSON.stringify(parsed[key]);
    return result;
  }, {});

  return { parsed, stringified };
};

const root = path.resolve(process.cwd());

// global variables definition
globalThis.$path = {
  root,
  app: `${root}/app`,
  assets: `${root}/app/assets`,
  public: `${root}/public`,
  storage: `${root}/storage`
};

globalThis.$env = {
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production'
};
