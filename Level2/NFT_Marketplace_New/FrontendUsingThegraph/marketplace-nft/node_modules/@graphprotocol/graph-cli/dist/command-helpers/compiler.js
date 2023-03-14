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
exports.createCompiler = void 0;
const url_1 = require("url");
const toolbox = __importStar(require("gluegun"));
const ipfs_http_client_1 = __importDefault(require("ipfs-http-client"));
const compiler_1 = __importDefault(require("../compiler"));
// Helper function to construct a subgraph compiler
function createCompiler(manifest, { ipfs, headers, outputDir, outputFormat, skipMigrations, blockIpfsMethods, protocol, }) {
    // Parse the IPFS URL
    let url;
    try {
        url = ipfs ? new url_1.URL(ipfs) : undefined;
    }
    catch (e) {
        toolbox.print.error(`Invalid IPFS URL: ${ipfs}
The IPFS URL must be of the following format: http(s)://host[:port]/[path]`);
        return null;
    }
    // Connect to the IPFS node (if a node address was provided)
    ipfs = ipfs
        ? (0, ipfs_http_client_1.default)({
            protocol: url?.protocol.replace(/[:]+$/, ''),
            host: url?.hostname,
            port: url?.port,
            'api-path': url?.pathname.replace(/\/$/, '') + '/api/v0/',
            headers,
        })
        : undefined;
    return new compiler_1.default({
        ipfs,
        subgraphManifest: manifest,
        outputDir,
        outputFormat,
        skipMigrations,
        blockIpfsMethods,
        protocol,
    });
}
exports.createCompiler = createCompiler;
