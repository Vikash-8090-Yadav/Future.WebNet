"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadManifest = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const js_yaml_1 = __importDefault(require("js-yaml"));
async function loadManifest(manifestFile) {
    if (manifestFile.match(/.js$/)) {
        return require(path_1.default.resolve(manifestFile));
    }
    return js_yaml_1.default.safeLoad(await fs_extra_1.default.readFile(manifestFile, 'utf-8'));
}
exports.loadManifest = loadManifest;
