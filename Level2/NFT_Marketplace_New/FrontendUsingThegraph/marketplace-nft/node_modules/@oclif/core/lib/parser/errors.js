"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FailedFlagValidationError = exports.ArgInvalidOptionError = exports.FlagInvalidOptionError = exports.NonExistentFlagsError = exports.UnexpectedArgsError = exports.RequiredFlagError = exports.RequiredArgsError = exports.InvalidArgsSpecError = exports.CLIParseError = exports.CLIError = void 0;
const errors_1 = require("../errors");
const help_1 = require("./help");
const list_1 = require("../cli-ux/list");
const chalk = require("chalk");
const util_1 = require("../config/util");
var errors_2 = require("../errors");
Object.defineProperty(exports, "CLIError", { enumerable: true, get: function () { return errors_2.CLIError; } });
class CLIParseError extends errors_1.CLIError {
    constructor(options) {
        options.message += '\nSee more help with --help';
        super(options.message);
        this.parse = options.parse;
    }
}
exports.CLIParseError = CLIParseError;
class InvalidArgsSpecError extends CLIParseError {
    constructor({ args, parse }) {
        let message = 'Invalid argument spec';
        const namedArgs = Object.values(args).filter(a => a.name);
        if (namedArgs.length > 0) {
            const list = (0, list_1.renderList)(namedArgs.map(a => [`${a.name} (${a.required ? 'required' : 'optional'})`, a.description]));
            message += `:\n${list}`;
        }
        super({ parse, message });
        this.args = args;
    }
}
exports.InvalidArgsSpecError = InvalidArgsSpecError;
class RequiredArgsError extends CLIParseError {
    constructor({ args, parse }) {
        let message = `Missing ${args.length} required arg${args.length === 1 ? '' : 's'}`;
        const namedArgs = args.filter(a => a.name);
        if (namedArgs.length > 0) {
            const list = (0, list_1.renderList)(namedArgs.map(a => [a.name, a.description]));
            message += `:\n${list}`;
        }
        super({ parse, message });
        this.args = args;
    }
}
exports.RequiredArgsError = RequiredArgsError;
class RequiredFlagError extends CLIParseError {
    constructor({ flag, parse }) {
        const usage = (0, list_1.renderList)((0, help_1.flagUsages)([flag], { displayRequired: false }));
        const message = `Missing required flag:\n${usage}`;
        super({ parse, message });
        this.flag = flag;
    }
}
exports.RequiredFlagError = RequiredFlagError;
class UnexpectedArgsError extends CLIParseError {
    constructor({ parse, args }) {
        const message = `Unexpected argument${args.length === 1 ? '' : 's'}: ${args.join(', ')}`;
        super({ parse, message });
        this.args = args;
    }
}
exports.UnexpectedArgsError = UnexpectedArgsError;
class NonExistentFlagsError extends CLIParseError {
    constructor({ parse, flags }) {
        const message = `Nonexistent flag${flags.length === 1 ? '' : 's'}: ${flags.join(', ')}`;
        super({ parse, message });
        this.flags = flags;
    }
}
exports.NonExistentFlagsError = NonExistentFlagsError;
class FlagInvalidOptionError extends CLIParseError {
    constructor(flag, input) {
        const message = `Expected --${flag.name}=${input} to be one of: ${flag.options.join(', ')}`;
        super({ parse: {}, message });
    }
}
exports.FlagInvalidOptionError = FlagInvalidOptionError;
class ArgInvalidOptionError extends CLIParseError {
    constructor(arg, input) {
        const message = `Expected ${input} to be one of: ${arg.options.join(', ')}`;
        super({ parse: {}, message });
    }
}
exports.ArgInvalidOptionError = ArgInvalidOptionError;
class FailedFlagValidationError extends CLIParseError {
    constructor({ parse, failed }) {
        const reasons = failed.map(r => r.reason);
        const deduped = (0, util_1.uniq)(reasons);
        const errString = deduped.length === 1 ? 'error' : 'errors';
        const message = `The following ${errString} occurred:\n  ${chalk.dim(deduped.join('\n  '))}`;
        super({ parse, message });
    }
}
exports.FailedFlagValidationError = FailedFlagValidationError;
