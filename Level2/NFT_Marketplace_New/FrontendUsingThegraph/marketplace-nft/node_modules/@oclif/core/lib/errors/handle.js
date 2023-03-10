"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle = void 0;
/* eslint-disable no-process-exit */
/* eslint-disable unicorn/no-process-exit */
const config_1 = require("./config");
const pretty_print_1 = require("./errors/pretty-print");
const _1 = require(".");
const clean = require("clean-stack");
const cli_1 = require("./errors/cli");
const handle = (err) => {
    try {
        if (!err)
            err = new cli_1.CLIError('no error?');
        if (err.message === 'SIGINT')
            process.exit(1);
        const shouldPrint = !(err instanceof _1.ExitError);
        const pretty = (0, pretty_print_1.default)(err);
        const stack = clean(err.stack || '', { pretty: true });
        if (shouldPrint) {
            console.error(pretty ? pretty : stack);
        }
        const exitCode = err.oclif?.exit !== undefined && err.oclif?.exit !== false ? err.oclif?.exit : 1;
        if (config_1.config.errorLogger && err.code !== 'EEXIT') {
            if (stack) {
                config_1.config.errorLogger.log(stack);
            }
            config_1.config.errorLogger.flush()
                .then(() => process.exit(exitCode))
                .catch(console.error);
        }
        else
            process.exit(exitCode);
    }
    catch (error) {
        console.error(err.stack);
        console.error(error.stack);
        process.exit(1);
    }
};
exports.handle = handle;
