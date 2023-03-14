"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGraphTsVersion = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
async function getGraphTsVersion(sourceDir) {
    let graphTsPath;
    for (let dir = path_1.default.resolve(sourceDir); 
    // Terminate after the root dir or when we have found node_modules
    dir !== undefined; 
    // Continue with the parent directory, terminate after the root dir
    dir = path_1.default.dirname(dir) === dir ? undefined : path_1.default.dirname(dir)) {
        const graphTsNodeModulesPath = path_1.default.join(dir, 'node_modules', '@graphprotocol', 'graph-ts');
        if (fs_extra_1.default.existsSync(graphTsNodeModulesPath)) {
            graphTsPath = graphTsNodeModulesPath;
            // Loop until we find the first occurrence of graph-ts in node_modules
            break;
        }
    }
    const pkgJsonFile = path_1.default.join(graphTsPath, 'package.json');
    const data = await fs_extra_1.default.readFile(pkgJsonFile);
    const jsonData = JSON.parse(data.toString());
    return jsonData.version;
}
exports.getGraphTsVersion = getGraphTsVersion;
