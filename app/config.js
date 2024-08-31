import path from 'path';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

// expand existing environment variables
const result = dotenvExpand.expand(dotenv.config());
const parsed = result.parsed;

export const getDefinedVars = () => {
  if (!parsed) return { parsed: {}, stringified: {} };

  // populate key/value based on parsed env result for DefinePlugin
  const stringified = Object.keys(parsed).reduce((result, key) => {
    result[`process.env.${key}`] = JSON.stringify(parsed[key]);
    return result;
  }, {});

  return { parsed, stringified };
};

// project path configuration
const root = path.resolve(process.cwd());
export const paths = {
  root,
  app: `${root}/app`,
  assets: `${root}/assets`,
  static: `${root}/static`,
  storage: `${root}/storage`
};

export const isDev = process.env.NODE_ENV === 'development';
export const isProd = process.env.NODE_ENV === 'production';
