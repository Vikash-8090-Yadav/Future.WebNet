"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureArgObject = exports.requireJson = exports.isNotFalsy = exports.isTruthy = exports.fileExists = exports.dirExists = exports.capitalize = exports.sumBy = exports.maxBy = exports.isProd = exports.castArray = exports.sortBy = exports.uniqBy = exports.compact = exports.pickBy = void 0;
const fs = require("fs");
const path_1 = require("path");
function pickBy(obj, fn) {
    return Object.entries(obj)
        .reduce((o, [k, v]) => {
        if (fn(v))
            o[k] = v;
        return o;
    }, {});
}
exports.pickBy = pickBy;
function compact(a) {
    return a.filter((a) => Boolean(a));
}
exports.compact = compact;
function uniqBy(arr, fn) {
    return arr.filter((a, i) => {
        const aVal = fn(a);
        return !arr.find((b, j) => j > i && fn(b) === aVal);
    });
}
exports.uniqBy = uniqBy;
function sortBy(arr, fn) {
    function compare(a, b) {
        a = a === undefined ? 0 : a;
        b = b === undefined ? 0 : b;
        if (Array.isArray(a) && Array.isArray(b)) {
            if (a.length === 0 && b.length === 0)
                return 0;
            const diff = compare(a[0], b[0]);
            if (diff !== 0)
                return diff;
            return compare(a.slice(1), b.slice(1));
        }
        if (a < b)
            return -1;
        if (a > b)
            return 1;
        return 0;
    }
    return arr.sort((a, b) => compare(fn(a), fn(b)));
}
exports.sortBy = sortBy;
function castArray(input) {
    if (input === undefined)
        return [];
    return Array.isArray(input) ? input : [input];
}
exports.castArray = castArray;
function isProd() {
    return !['development', 'test'].includes(process.env.NODE_ENV ?? '');
}
exports.isProd = isProd;
function maxBy(arr, fn) {
    if (arr.length === 0) {
        return undefined;
    }
    return arr.reduce((maxItem, i) => {
        const curr = fn(i);
        const max = fn(maxItem);
        return curr > max ? i : maxItem;
    });
}
exports.maxBy = maxBy;
function sumBy(arr, fn) {
    return arr.reduce((sum, i) => sum + fn(i), 0);
}
exports.sumBy = sumBy;
function capitalize(s) {
    return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : '';
}
exports.capitalize = capitalize;
const dirExists = async (input) => {
    if (!fs.existsSync(input)) {
        throw new Error(`No directory found at ${input}`);
    }
    if (!(await fs.promises.stat(input)).isDirectory()) {
        throw new Error(`${input} exists but is not a directory`);
    }
    return input;
};
exports.dirExists = dirExists;
const fileExists = async (input) => {
    if (!fs.existsSync(input)) {
        throw new Error(`No file found at ${input}`);
    }
    if (!(await fs.promises.stat(input)).isFile()) {
        throw new Error(`${input} exists but is not a file`);
    }
    return input;
};
exports.fileExists = fileExists;
function isTruthy(input) {
    return ['true', '1', 'yes', 'y'].includes(input.toLowerCase());
}
exports.isTruthy = isTruthy;
function isNotFalsy(input) {
    return !['false', '0', 'no', 'n'].includes(input.toLowerCase());
}
exports.isNotFalsy = isNotFalsy;
function requireJson(...pathParts) {
    return JSON.parse(fs.readFileSync((0, path_1.join)(...pathParts), 'utf8'));
}
exports.requireJson = requireJson;
/**
 * Ensure that the provided args are an object. This is for backwards compatibility with v1 commands which
 * defined args as an array.
 *
 * @param args Either an array of args or an object of args
 * @returns ArgInput
 */
function ensureArgObject(args) {
    return (Array.isArray(args) ? (args ?? []).reduce((x, y) => {
        return { ...x, [y.name]: y };
    }, {}) : args ?? {});
}
exports.ensureArgObject = ensureArgObject;
