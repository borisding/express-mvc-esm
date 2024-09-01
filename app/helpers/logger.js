import winston from 'winston';

const { format, transports, createLogger } = winston;
const { combine, json, timestamp, label } = format;

export const logger = createLogger({
  exitOnError: false,
  transports: [
    new transports.File({
      level: 'info',
      filename: `${$path.storage}/logs/access.log`
    }),
    new transports.File({
      level: 'error',
      filename: `${$path.storage}/logs/errors.log`,
      format: combine(
        label({ label: 'ERROR STACK:' }),
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        json()
      )
    })
  ]
});

// add console only for development
if ($env.isDev) {
  logger.add(
    new transports.Console({
      handleExceptions: true
    })
  );
}
