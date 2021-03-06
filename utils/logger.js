import winston from 'winston';
import { env, paths } from '../utils/index.js';

const { format, transports, createLogger } = winston;
const { combine, json, timestamp, label } = format;

const logger = createLogger({
  exitOnError: false,
  transports: [
    new transports.File({
      level: 'info',
      filename: `${paths.storage}/logs/access.log`
    }),
    new transports.File({
      level: 'error',
      filename: `${paths.storage}/logs/errors.log`,
      format: combine(
        label({ label: 'ERROR STACK:' }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        json()
      )
    })
  ]
});

// add console only for development
if (env.isDev) {
  logger.add(
    new transports.Console({
      handleExceptions: true
    })
  );
}

export default logger;
