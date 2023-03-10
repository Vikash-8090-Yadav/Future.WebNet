"use strict";
/* eslint-disable */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolbox = __importStar(require("gluegun"));
const load_manifest_1 = require("./util/load-manifest");
// Spec version 0.0.4 uses feature management, but features are
// detected and validated by the graph-node instance during subgraph
// deployment.
//
// Also, we skip spec version 0.0.3, which is considered invalid and
// non-canonical.
exports.default = {
    name: 'Bump manifest specVersion from 0.0.2 to 0.0.4',
    predicate: async ({ manifestFile }) => {
        const manifest = await (0, load_manifest_1.loadManifest)(manifestFile);
        return (manifest &&
            typeof manifest === 'object' &&
            manifest.specVersion &&
            (manifest.specVersion === '0.0.2' || manifest.specVersion === '0.0.3'));
    },
    apply: async ({ manifestFile }) => {
        await toolbox.patching.patch(manifestFile, {
            insert: 'specVersion: 0.0.4',
            replace: new RegExp(`specVersion: ['"]?0.0.[23]['"]?`),
        });
    },
};
