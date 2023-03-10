// Host export for logging, providing basic logging functionality
export declare namespace log {
  export function log(level: Level, msg: string): void;
}

export namespace log {
  export enum Level {
    CRITICAL = 0,
    ERROR = 1,
    WARNING = 2,
    INFO = 3,
    DEBUG = 4,
    SUCCESS = 5
  }

  export function critical(msg: string, args: Array<string>): void {
    log.log(Level.CRITICAL, format(msg, args));
  }

  export function error(msg: string, args: Array<string>): void {
    log.log(Level.ERROR, format(msg, args));
  }

  export function warning(msg: string, args: Array<string>): void {
    log.log(Level.WARNING, format(msg, args));
  }

  export function info(msg: string, args: Array<string>): void {
    log.log(Level.INFO, format(msg, args));
  }

  export function debug(msg: string, args: Array<string>): void {
    log.log(Level.DEBUG, format(msg, args));
  }

  export function success(msg: string, args: Array<string>): void {
    log.log(Level.SUCCESS, format(msg, args));
  }
}

function format(fmt: string, args: string[]): string {
  let out = '';
  let argIndex = 0;
  for (let i: i32 = 0, len: i32 = fmt.length; i < len; i++) {
    // 0x7b = '{' 0x7d = '}'
    if (i < len - 1 && fmt.charCodeAt(i) == 0x7b && fmt.charCodeAt(i + 1) == 0x7d) {
      if (argIndex >= args.length) {
        throw new Error('Too few arguments for format string: ' + fmt);
      } else {
        out += args[argIndex++];
        i++;
      }
    } else {
      out += fmt[i];
    }
  }
  return out;
}
