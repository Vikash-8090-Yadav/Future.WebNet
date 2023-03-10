"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromManifest = exports.fromFilePath = void 0;
const immutable_1 = __importDefault(require("immutable"));
const load_manifest_1 = require("../migrations/util/load-manifest");
// Loads manifest from file path and returns all:
// - data sources
// - templates
// In a single list.
const fromFilePath = async (manifestPath) => {
    const { dataSources = [], templates = [] } = await (0, load_manifest_1.loadManifest)(manifestPath);
    return dataSources.concat(templates);
};
exports.fromFilePath = fromFilePath;
const extractDataSourceByType = (manifest, dataSourceType, protocol) => manifest
    .get(dataSourceType, immutable_1.default.List())
    .reduce((dataSources, dataSource, dataSourceIndex) => protocol.isValidKindName(dataSource.get('kind'))
    ? dataSources.push(immutable_1.default.Map({ path: [dataSourceType, dataSourceIndex], dataSource }))
    : dataSources, immutable_1.default.List());
// Extracts data sources and templates from a immutable manifest data structure
const fromManifest = (manifest, protocol) => {
    const dataSources = extractDataSourceByType(manifest, 'dataSources', protocol);
    const templates = extractDataSourceByType(manifest, 'templates', protocol);
    return dataSources.concat(templates);
};
exports.fromManifest = fromManifest;
