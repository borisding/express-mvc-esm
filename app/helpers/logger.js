import winston from 'winston';
import { isDev, paths } from '../../utils/index.js';

const { format, transports, createLogger } = winston;
const { combine, json, timestamp, label } = format;

export const logger = createLogger({
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
if (isDev) {
  logger.add(
    new transports.Console({
      handleExceptions: true
    })
  );
}
