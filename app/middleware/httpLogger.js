import morgan from 'morgan';
import { env, logger } from '../../utils/index.js';

// winston logger's "stream" writable for morgan
logger.stream = {
  write: message => {
    logger.info(message);
  }
};

const httpLogger = () => {
  return morgan(env.isDev ? 'tiny' : 'combined', {
    stream: logger.stream,
    skip: (req, res) => res.statusCode < 400
  });
};

export default httpLogger;
