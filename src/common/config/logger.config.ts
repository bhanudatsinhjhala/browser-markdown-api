import { WinstonModuleOptions, utilities } from 'nest-winston';
import * as path from 'path';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import { Defaults } from './default.config';

/**
 * Description - Logger Middleware
 * @returns
 */
export const winstonOptions = (): WinstonModuleOptions => {
  const logsFilePath = path.join(path.resolve(), `./logs/`);
  let dailyRotateTransport;
  if (process.env.NODE_ENV !== 'production') {
    dailyRotateTransport = new DailyRotateFile({
      filename: logsFilePath + '%DATE%.log',
      datePattern: 'YYYY-MM-DD',
    });
  }

  return {
    exitOnError: false,
    level: 'debug',
    format: winston.format.combine(winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), winston.format.json()),
    transports: [
      ...(process.env.NODE_ENV === 'production'
        ? [
            new winston.transports.Console({
              format: winston.format.combine(
                winston.format.colorize(),
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                utilities.format.nestLike('Browser Markdown', {
                  colors: true,
                  prettyPrint: false,
                }),
              ),
            }),
          ]
        : [
            new winston.transports.File({
              filename: Defaults.COMBINED_LOG_PATH,
              maxsize: 1048576,
            }),
            new winston.transports.File({
              filename: Defaults.ERROR_LOG_PATH,
              level: 'error',
              maxsize: 83_88_608,
            }),
            ...(dailyRotateTransport !== undefined
              ? [
                  dailyRotateTransport,
                  new winston.transports.Console({
                    format: winston.format.combine(
                      winston.format.colorize(),
                      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                      utilities.format.nestLike('Browser Markdown', {
                        colors: true,
                        prettyPrint: false,
                      }),
                    ),
                  }),
                ]
              : [
                  new winston.transports.Console({
                    format: winston.format.combine(
                      winston.format.colorize(),
                      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                      utilities.format.nestLike('Browser Markdown', {
                        colors: true,
                        prettyPrint: false,
                      }),
                    ),
                  }),
                ]),
          ]),
    ],
  };
};
