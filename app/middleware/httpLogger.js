import morgan from 'morgan';
import { isDev } from '#config';
import { logger } from '#helpers/logger';

// winston logger's "stream" writable for morgan
logger.stream = {
  write: message => {
    logger.info(message);
  }
};

export const httpLogger = () => {
  return morgan(isDev ? 'tiny' : 'combined', {
    stream: logger.stream,
    skip: (req, res) => res.statusCode < 400
  });
};
