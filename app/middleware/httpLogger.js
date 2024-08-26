import morgan from 'morgan';
import { env } from '../../utils/index.js';
import { logger } from '../helpers/logger.js';

// winston logger's "stream" writable for morgan
logger.stream = {
  write: message => {
    logger.info(message);
  }
};

export const httpLogger = () => {
  return morgan(env.isDev ? 'tiny' : 'combined', {
    stream: logger.stream,
    skip: (req, res) => res.statusCode < 400
  });
};
