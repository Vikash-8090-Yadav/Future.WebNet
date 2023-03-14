"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJsonRpcClient = void 0;
const gluegun_1 = require("gluegun");
const jayson_1 = __importDefault(require("jayson"));
function createJsonRpcClient(url) {
    const params = {
        host: url.hostname,
        port: url.port,
        path: url.pathname,
        // username may be empty
        auth: url.password ? `${url.username}:${url.password}` : undefined,
    };
    if (url.protocol === 'https:') {
        return jayson_1.default.Client.https(params);
    }
    if (url.protocol === 'http:') {
        return jayson_1.default.Client.http(params);
    }
    gluegun_1.print.error(`Unsupported protocol: ${url.protocol.substring(0, url.protocol.length - 1)}`);
    gluegun_1.print.error('The Graph Node URL must be of the following format: http(s)://host[:port]/[path]');
    return null;
}
exports.createJsonRpcClient = createJsonRpcClient;
