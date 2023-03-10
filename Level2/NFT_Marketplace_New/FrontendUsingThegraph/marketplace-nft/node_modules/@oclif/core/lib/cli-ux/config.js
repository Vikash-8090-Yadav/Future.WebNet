"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = exports.Config = void 0;
const semver = require("semver");
const util_1 = require("../util");
const spinner_1 = require("./action/spinner");
const spinner_2 = require("./action/spinner");
const pride_spinner_1 = require("./action/pride-spinner");
const version = semver.parse((0, util_1.requireJson)(__dirname, '..', '..', 'package.json').version);
const g = global;
const globals = g['cli-ux'] || (g['cli-ux'] = {});
const actionType = (Boolean(process.stderr.isTTY) &&
    !process.env.CI &&
    !['dumb', 'emacs-color'].includes(process.env.TERM) &&
    'spinner') || 'simple';
const Action = actionType === 'spinner' ? spinner_1.default : spinner_2.default;
const PrideAction = actionType === 'spinner' ? pride_spinner_1.default : spinner_2.default;
class Config {
    constructor() {
        this.outputLevel = 'info';
        this.action = new Action();
        this.prideAction = new PrideAction();
        this.errorsHandled = false;
        this.showStackTrace = true;
    }
    get debug() {
        return globals.debug || process.env.DEBUG === '*';
    }
    set debug(v) {
        globals.debug = v;
    }
    get context() {
        return globals.context || {};
    }
    set context(v) {
        globals.context = v;
    }
}
exports.Config = Config;
function fetch() {
    if (globals[version.major])
        return globals[version.major];
    globals[version.major] = new Config();
    return globals[version.major];
}
exports.config = fetch();
exports.default = exports.config;
