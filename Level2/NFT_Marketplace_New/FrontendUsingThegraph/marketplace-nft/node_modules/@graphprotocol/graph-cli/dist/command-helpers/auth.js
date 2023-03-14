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
exports.saveDeployKey = exports.identifyDeployKey = void 0;
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const toolbox = __importStar(require("gluegun"));
const node_1 = require("./node");
const homedir = os_1.default.homedir();
const CONFIG_PATH = path_1.default.join(homedir, '/.graph-cli.json');
const getConfig = () => {
    let config;
    try {
        config = JSON.parse(fs_1.default.readFileSync(CONFIG_PATH).toString());
    }
    catch {
        config = {};
    }
    return config;
};
const identifyDeployKey = async (node, deployKey) => {
    // Determine the deploy key to use, if any:
    // - First try using --deploy-key, if provided
    // - Then see if we have a deploy key set for the Graph node
    if (deployKey !== undefined) {
        return deployKey;
    }
    try {
        node = (0, node_1.normalizeNodeUrl)(node);
        const config = getConfig();
        return config[node];
    }
    catch (e) {
        toolbox.print.warning(`Could not get deploy key: ${e.message}`);
        toolbox.print.info(`Continuing without a deploy key\n`);
    }
};
exports.identifyDeployKey = identifyDeployKey;
const saveDeployKey = async (node, deployKey) => {
    try {
        node = (0, node_1.normalizeNodeUrl)(node);
        const config = getConfig();
        config[node] = deployKey;
        fs_1.default.writeFileSync(CONFIG_PATH, JSON.stringify(config));
    }
    catch (e) {
        throw new Error(`Error storing deploy key: ${e.message}`);
    }
};
exports.saveDeployKey = saveDeployKey;
