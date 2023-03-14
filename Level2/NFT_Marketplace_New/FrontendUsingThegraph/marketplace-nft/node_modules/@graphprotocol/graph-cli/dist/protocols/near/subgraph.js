"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = __importDefault(require("immutable"));
class NearSubgraph {
    constructor(options) {
        this.manifest = options.manifest;
        this.resolveFile = options.resolveFile;
        this.protocol = options.protocol;
    }
    validateManifest() {
        return immutable_1.default.List();
    }
    handlerTypes() {
        return immutable_1.default.List(['blockHandlers', 'receiptHandlers']);
    }
}
exports.default = NearSubgraph;
