import { InjectionToken } from "@angular/core";

type LogFunction<T> = (message: string, payload?: T) => void;

/* tslint:disable:no-console */

export enum MUSE_LOG_LEVELS {
  "TRACE",
  "DEBUG",
  "INFO",
  "LOG",
  "WARN",
  "ERROR",
  "FATAL",
  "OFF"
}

export function loggerGetLogColor(
  level: MUSE_LOG_LEVELS
): "blue" | "teal" | "gray" | "red" | undefined {
  switch (level) {
    case MUSE_LOG_LEVELS.TRACE:
      return "blue";
    case MUSE_LOG_LEVELS.DEBUG:
      return "teal";
    case MUSE_LOG_LEVELS.INFO:
    case MUSE_LOG_LEVELS.LOG:
      return "gray";
    case MUSE_LOG_LEVELS.WARN:
    case MUSE_LOG_LEVELS.ERROR:
    case MUSE_LOG_LEVELS.FATAL:
      return "red";
    case MUSE_LOG_LEVELS.OFF:
    default:
      return;
  }
}

export function loggerLogToConsole<T extends { message?: string }>(
  level: MUSE_LOG_LEVELS,
  payload: T
) {
  const color = loggerGetLogColor(level);

  switch (level) {
    case MUSE_LOG_LEVELS.WARN:
      console.warn(`%c${payload.message}`, `color:${color}`, payload);
      break;
    case MUSE_LOG_LEVELS.ERROR:
    case MUSE_LOG_LEVELS.FATAL:
      console.error(`%c${payload.message}`, `color:${color}`, payload);
      break;
    case MUSE_LOG_LEVELS.INFO:
      console.info(`%c${payload.message}`, `color:${color}`, payload);
      break;
    default:
      console.log(`%c${payload.message}`, `color:${color}`, payload);
  }
}

export interface Logger<T> {
  trace: LogFunction<T>;
  debug: LogFunction<T>;
  info: LogFunction<T>;
  log: LogFunction<T>;
  warn: LogFunction<T>;
  error: LogFunction<T>;
  fatal: LogFunction<T>;
}

export const LOGGER = new InjectionToken("Default Console Logger", {
  providedIn: "root",
  factory: () => {
    return {
      trace(message: string, payload = {}) {
        return loggerLogToConsole(MUSE_LOG_LEVELS.TRACE, {
          message,
          ...payload
        });
      },
      debug(message: string, payload = {}) {
        return loggerLogToConsole(MUSE_LOG_LEVELS.DEBUG, {
          message,
          ...payload
        });
      },
      info(message: string, payload = {}) {
        return loggerLogToConsole(MUSE_LOG_LEVELS.INFO, {
          message,
          ...payload
        });
      },
      log(message: string, payload = {}) {
        return loggerLogToConsole(MUSE_LOG_LEVELS.LOG, {
          message,
          ...payload
        });
      },
      warn(message: string, payload = {}) {
        return loggerLogToConsole(MUSE_LOG_LEVELS.WARN, {
          message,
          ...payload
        });
      },
      error(message: string, payload = {}) {
        return loggerLogToConsole(MUSE_LOG_LEVELS.ERROR, {
          message,
          ...payload
        });
      },
      fatal(message: string, payload = {}) {
        return loggerLogToConsole(MUSE_LOG_LEVELS.FATAL, {
          message,
          ...payload
        });
      }
    };
  }
});
