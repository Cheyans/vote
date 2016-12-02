import {Logger, transports, LoggerInstance} from "winston";
import "winston-daily-rotate-file";

const logger: LoggerInstance = new Logger({
  transports: [
    new transports.DailyRotateFile({
      filename: "./server/logs/log",
      handleExceptions: true,
      prettyPrint: true,
      json: false,
      maxsize: 5000000,
      maxFiles: 5
    }),
    new transports.Console({
      handleExceptions: true,
      timestamp: true,
      prettyPrint: true,
      colorize: true,
      humanReadableUnhandledException: true
    })
  ]
});

export default logger;
