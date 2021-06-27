import winston from 'winston';

export default winston.createLogger({
  level: 'debug',
  transports: [
    new (winston.transports.Console)(),
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(info => `${info.timestamp} ${info.level} ${info.message}`),
  ),
});
