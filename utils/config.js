import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

// expand existing environment variables
const result = dotenvExpand.expand(dotenv.config());
const parsed = result.parsed;

export function getDefinedVars() {
  if (!parsed) {
    return { parsed: {}, stringified: {} };
  }

  // populate key/value based on parsed env result for DefinePlugin
  const stringified = Object.keys(parsed).reduce((result, key) => {
    result[`process.env.${key}`] = JSON.stringify(parsed[key]);
    return result;
  }, {});

  return { parsed, stringified };
}
