import { CLIError } from '../errors';
import { OptionFlag, Flag } from '../interfaces';
import { Arg, ArgInput, CLIParseErrorOptions } from '../interfaces/parser';
export { CLIError } from '../errors';
export type Validation = {
    name: string;
    status: 'success' | 'failed';
    validationFn: string;
    reason?: string;
};
export declare class CLIParseError extends CLIError {
    parse: CLIParseErrorOptions['parse'];
    constructor(options: CLIParseErrorOptions & {
        message: string;
    });
}
export declare class InvalidArgsSpecError extends CLIParseError {
    args: ArgInput;
    constructor({ args, parse }: CLIParseErrorOptions & {
        args: ArgInput;
    });
}
export declare class RequiredArgsError extends CLIParseError {
    args: Arg<any>[];
    constructor({ args, parse }: CLIParseErrorOptions & {
        args: Arg<any>[];
    });
}
export declare class RequiredFlagError extends CLIParseError {
    flag: Flag<any>;
    constructor({ flag, parse }: CLIParseErrorOptions & {
        flag: Flag<any>;
    });
}
export declare class UnexpectedArgsError extends CLIParseError {
    args: unknown[];
    constructor({ parse, args }: CLIParseErrorOptions & {
        args: unknown[];
    });
}
export declare class NonExistentFlagsError extends CLIParseError {
    flags: string[];
    constructor({ parse, flags }: CLIParseErrorOptions & {
        flags: string[];
    });
}
export declare class FlagInvalidOptionError extends CLIParseError {
    constructor(flag: OptionFlag<any>, input: string);
}
export declare class ArgInvalidOptionError extends CLIParseError {
    constructor(arg: Arg<any>, input: string);
}
export declare class FailedFlagValidationError extends CLIParseError {
    constructor({ parse, failed }: CLIParseErrorOptions & {
        failed: Validation[];
    });
}
