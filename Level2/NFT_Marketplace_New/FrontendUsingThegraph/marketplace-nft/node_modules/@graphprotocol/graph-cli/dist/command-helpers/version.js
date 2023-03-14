"use strict";
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
exports.assertGraphTsVersion = exports.assertManifestApiVersion = void 0;
const semver_1 = __importDefault(require("semver"));
const manifestUtil = __importStar(require("../migrations/util/load-manifest"));
const graphTsUtil = __importStar(require("../migrations/util/versions"));
const assertManifestApiVersion = async (manifestPath, minimumApiVersion) => {
    const manifest = await manifestUtil.loadManifest(manifestPath);
    const lessThanMinimumVersion = (manifestApiVersion) => semver_1.default.lt(manifestApiVersion, minimumApiVersion);
    let isLessThanMinimumVersion = false;
    if (manifest) {
        if (manifest.dataSources && Array.isArray(manifest.dataSources)) {
            isLessThanMinimumVersion = manifest.dataSources.some((dataSource) => dataSource?.mapping?.apiVersion && lessThanMinimumVersion(dataSource.mapping.apiVersion));
        }
        if (manifest.templates && Array.isArray(manifest.templates)) {
            isLessThanMinimumVersion || (isLessThanMinimumVersion = manifest.templates.some((template) => template?.mapping?.apiVersion && lessThanMinimumVersion(template.mapping.apiVersion)));
        }
    }
    if (isLessThanMinimumVersion) {
        throw new Error(`The current version of graph-cli can't be used with mappings on apiVersion less than '${minimumApiVersion}'`);
    }
};
exports.assertManifestApiVersion = assertManifestApiVersion;
const assertGraphTsVersion = async (sourceDir, minimumGraphTsVersion) => {
    let graphTsVersion;
    try {
        graphTsVersion = await graphTsUtil.getGraphTsVersion(sourceDir);
    }
    catch (_) {
        // We only do the assertion if `graph-ts` is installed.
    }
    // Coerce needed because we may be dealing with an alpha version
    // and in the `semver` library, this would return true when comparing
    // the same version.
    if (graphTsVersion && semver_1.default.lt(semver_1.default.coerce(graphTsVersion), minimumGraphTsVersion)) {
        throw new Error(`To use this version of the graph-cli you must upgrade the graph-ts dependency to a version greater than or equal to ${minimumGraphTsVersion}
Also, you'll probably need to take a look at our AssemblyScript migration guide because of language breaking changes: https://thegraph.com/docs/developer/assemblyscript-migration-guide`);
    }
};
exports.assertGraphTsVersion = assertGraphTsVersion;
