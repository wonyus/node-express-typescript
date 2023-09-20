import { createLogger, format, transports, Logger as WinstonLogger } from "winston";
import * as fs from "fs";
import * as path from "path";

export class APILogger {
  private logger: WinstonLogger;

  constructor() {
    const env = process.env.NODE_ENV || "development";
    const logDir = "logs";
    const pathLabel = path.basename(process.mainModule.filename);

    // Create the log directory if it does not exist
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }

    const filename = path.join(logDir, "results.log");

    this.logger = createLogger({
      // change level if in dev environment versus production
      level: env === "production" ? "info" : "debug",
      format: format.combine(format.label({ label: pathLabel }), format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" })),
      transports: [
        new transports.Console({
          format: format.combine(
            format.colorize(),
            format.printf((info) => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`)
          ),
        }),
        new transports.File({
          filename,
          format: format.combine(
            format.printf((info) => `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`)
          ),
        }),
      ],
    });
  }

  public error(message: string): void {
    this.logger.error(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public verbose(message: string): void {
    this.logger.verbose(message);
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }

  public silly(message: string): void {
    this.logger.silly(message);
  }
}
