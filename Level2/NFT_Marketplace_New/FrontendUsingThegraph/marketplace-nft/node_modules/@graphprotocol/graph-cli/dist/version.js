"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.version = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const packageJson = JSON.parse(fs_1.default
    .readFileSync(
// works even when bundled/built because the path to package.json is the same
path_1.default.join(__dirname, '..', 'package.json'))
    .toString());
exports.version = packageJson.version;
