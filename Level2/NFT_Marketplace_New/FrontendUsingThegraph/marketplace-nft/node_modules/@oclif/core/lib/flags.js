"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.help = exports.version = exports.string = exports.url = exports.file = exports.directory = exports.integer = exports.boolean = exports.custom = void 0;
const url_1 = require("url");
const help_1 = require("./help");
const util_1 = require("./util");
function custom(defaults) {
    return (options = {}) => {
        return {
            parse: async (input, _ctx, _opts) => input,
            ...defaults,
            ...options,
            input: [],
            multiple: Boolean(options.multiple === undefined ? defaults.multiple : options.multiple),
            type: 'option',
        };
    };
}
exports.custom = custom;
function boolean(options = {}) {
    return {
        parse: async (b, _) => b,
        ...options,
        allowNo: Boolean(options.allowNo),
        type: 'boolean',
    };
}
exports.boolean = boolean;
exports.integer = custom({
    parse: async (input, _, opts) => {
        if (!/^-?\d+$/.test(input))
            throw new Error(`Expected an integer but received: ${input}`);
        const num = Number.parseInt(input, 10);
        if (opts.min !== undefined && num < opts.min)
            throw new Error(`Expected an integer greater than or equal to ${opts.min} but received: ${input}`);
        if (opts.max !== undefined && num > opts.max)
            throw new Error(`Expected an integer less than or equal to ${opts.max} but received: ${input}`);
        return num;
    },
});
exports.directory = custom({
    parse: async (input, _, opts) => {
        if (opts.exists)
            return (0, util_1.dirExists)(input);
        return input;
    },
});
exports.file = custom({
    parse: async (input, _, opts) => {
        if (opts.exists)
            return (0, util_1.fileExists)(input);
        return input;
    },
});
/**
 * Initializes a string as a URL. Throws an error
 * if the string is not a valid URL.
 */
exports.url = custom({
    parse: async (input) => {
        try {
            return new url_1.URL(input);
        }
        catch {
            throw new Error(`Expected a valid url but received: ${input}`);
        }
    },
});
const stringFlag = custom({});
exports.string = stringFlag;
const version = (opts = {}) => {
    return boolean({
        description: 'Show CLI version.',
        ...opts,
        parse: async (_, ctx) => {
            ctx.log(ctx.config.userAgent);
            ctx.exit(0);
        },
    });
};
exports.version = version;
const help = (opts = {}) => {
    return boolean({
        description: 'Show CLI help.',
        ...opts,
        parse: async (_, cmd) => {
            new help_1.Help(cmd.config).showHelp(cmd.id ? [cmd.id, ...cmd.argv] : cmd.argv);
            cmd.exit(0);
        },
    });
};
exports.help = help;
