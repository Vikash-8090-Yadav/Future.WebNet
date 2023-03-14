"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayPath = void 0;
const path_1 = __importDefault(require("path"));
const displayPath = (p) => path_1.default.relative(process.cwd(), p);
exports.displayPath = displayPath;
