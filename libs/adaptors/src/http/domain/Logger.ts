export interface Logger {
  log(message: any): void;
  error(message: any): void;
  warn(message: any): void;
  debug(message: any): void;
  verbose(message: any): void;
  request(message: any): void;
  response(message: any): void;
}

export enum Color {
  NULL = '\x1b[30m',
  ERROR = '\x1b[31m',
  SUCCESS = '\x1b[32m',
  WARNING = '\x1b[33m',
  INFO = '\x1b[34m',
  SYSTEM = '\x1b[35m',
  IMPORTANT = '\x1b[36m',
  MESSAGE = '\x1b[37m',
}

export enum Decorator {
  RESET = '\x1b[0m',
  BRIGHT = '\x1b[1m',
  DIM = '\x1b[2m',
  UNDERSCORE = '\x1b[4m',
  BLINK = '\x1b[5m',
  REVERSE = '\x1b[7m',
  HIDDEN = '\x1b[8m',
}

export enum FormatDates {
  ISO = 'yyyy-MM-dd HH:mm:ss.SSS',
  LARGE = 'cccc, MMMM Do yyyy, h:mm:ss.SSS a',
  UTC = 'dd, cccc MMM yyyy HH:mm:ss.SSS',
  CLF = 'dd/MMM/yyyy:HH:mm:ss.SSS',
}

export enum LogTypes {
  LOG = '[LOG]',
  ERROR = '[ERROR]',
  REQUEST = '[REQUEST]',
  RESPONSE = '[RESPONSE]',
  WARNING = '[WARNING]',
  INFO = '[INFO]',
}
