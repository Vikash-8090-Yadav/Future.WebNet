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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolbox = __importStar(require("gluegun"));
const semver_1 = __importDefault(require("semver"));
const load_manifest_1 = require("./util/load-manifest");
const versions_1 = require("./util/versions");
// If any of the manifest apiVersions are 0.0.5, replace them with 0.0.6
exports.default = {
    name: 'Bump mapping apiVersion from 0.0.5 to 0.0.6',
    predicate: async ({ sourceDir, manifestFile }) => {
        // Obtain the graph-ts version, if possible
        let graphTsVersion;
        try {
            graphTsVersion = await (0, versions_1.getGraphTsVersion)(sourceDir);
        }
        catch (_) {
            // If we cannot obtain the version, return a hint that the graph-ts
            // hasn't been installed yet
            return 'graph-ts dependency not installed yet';
        }
        const manifest = await (0, load_manifest_1.loadManifest)(manifestFile);
        return (
        // Only migrate if the graph-ts version is >= 0.24.0...
        // Coerce needed because we may be dealing with an alpha version
        // and in the `semver` library this would not return true on equality.
        semver_1.default.gte(semver_1.default.coerce(graphTsVersion), '0.24.0') &&
            // ...and we have a manifest with mapping > apiVersion = 0.0.5
            manifest &&
            typeof manifest === 'object' &&
            Array.isArray(manifest.dataSources) &&
            (manifest.dataSources.reduce((hasOldMappings, dataSource) => hasOldMappings ||
                (typeof dataSource === 'object' &&
                    dataSource.mapping &&
                    typeof dataSource.mapping === 'object' &&
                    dataSource.mapping.apiVersion === '0.0.5'), false) ||
                (Array.isArray(manifest.templates) &&
                    manifest.templates.reduce((hasOldMappings, template) => hasOldMappings ||
                        (typeof template === 'object' &&
                            template.mapping &&
                            typeof template.mapping === 'object' &&
                            template.mapping.apiVersion === '0.0.5'), false))));
    },
    apply: async ({ manifestFile }) => {
        // Make sure we catch all variants; we could load the manifest
        // and replace the values in the data structures here; unfortunately
        // writing that back to the file messes with the formatting more than
        // we'd like; that's why for now, we use a simple patching approach
        await toolbox.patching.replace(manifestFile, 
        // @ts-expect-error toolbox patching seems to accept RegExp
        new RegExp('apiVersion: 0.0.5', 'g'), 'apiVersion: 0.0.6');
        await toolbox.patching.replace(manifestFile, 
        // @ts-expect-error toolbox patching seems to accept RegExp
        new RegExp("apiVersion: '0.0.5'", 'g'), "apiVersion: '0.0.6'");
        await toolbox.patching.replace(manifestFile, 
        // @ts-expect-error toolbox patching seems to accept RegExp
        new RegExp('apiVersion: "0.0.5"', 'g'), 'apiVersion: "0.0.6"');
    },
};
